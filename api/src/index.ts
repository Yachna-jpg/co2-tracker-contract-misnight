// This file is part of midnightntwrk/example-carbon-credit.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Provides types and utilities for working with carbon credit tracker contracts.
 *
 * @packageDocumentation
 */

import * as CarbonCredit from '../../contract/src/managed/carbon-credit/contract/index.js';

import { type ContractAddress, convertFieldToBytes } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type Logger } from 'pino';
import {
  type CarbonCreditDerivedState,
  type CarbonCreditContract,
  type CarbonCreditProviders,
  type DeployedCarbonCreditContract,
  carbonCreditPrivateStateKey,
} from './common-types.js';
import { CompiledCarbonCreditContractContract } from '../../contract/src/index';
import * as utils from './utils/index.js';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { combineLatest, map, tap, from, type Observable } from 'rxjs';
import { toHex } from '@midnight-ntwrk/midnight-js-utils';
import { CarbonCreditPrivateState, createCarbonCreditPrivateState } from '../../contract/src/witnesses.js';

/** @internal */

/**
 * An API for a deployed carbon credit tracker.
 */
export interface DeployedCarbonCreditAPI {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Observable<CarbonCreditDerivedState>;

  recordCredit: (message: string) => Promise<void>;
  retireCredit: () => Promise<void>;
}

/**
 * Provides an implementation of {@link DeployedCarbonCreditAPI} by adapting a deployed carbon credit tracker
 * contract.
 *
 * @remarks
 * The `CarbonCreditPrivateState` is managed at the DApp level by a private state provider. As such, this
 * private state is shared between all instances of {@link CarbonCreditAPI}, and their underlying deployed
 * contracts. The private state defines a `'secretKey'` property that effectively identifies the current
 * user, and is used to determine if the current user is the owner of the message as the observable
 * contract state changes.
 *
 * In the future, Midnight.js will provide a private state provider that supports private state storage
 * keyed by contract address. This will remove the current workaround of sharing private state across
 * the deployed carbon credit tracker contracts, and allows for a unique secret key to be generated for each bulletin
 * board that the user interacts with.
 */
// TODO: Update CarbonCreditAPI to use contract level private state storage.
export class CarbonCreditAPI implements DeployedCarbonCreditAPI {
  /** @internal */
  private constructor(
    public readonly deployedContract: DeployedCarbonCreditContract,
    providers: CarbonCreditProviders,
    private readonly logger?: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    providers.privateStateProvider.setContractAddress(this.deployedContractAddress);
    this.state$ = combineLatest(
      [
        // Combine public (ledger) state with...
        providers.publicDataProvider.contractStateObservable(this.deployedContractAddress, { type: 'latest' }).pipe(
          map((contractState) => CarbonCredit.ledger(contractState.data)),
          tap((ledgerState) =>
            logger?.trace({
              ledgerStateChanged: {
                ledgerState: {
                  ...ledgerState,
                  state: ledgerState.state === CarbonCredit.State.OCCUPIED ? 'occupied' : 'vacant',
                  owner: toHex(ledgerState.owner),
                },
              },
            }),
          ),
        ),
        // ...private state...
        //    since the private state of the carbon credit tracker application never changes, we can query the
        //    private state once and always use the same value with `combineLatest`. In applications
        //    where the private state is expected to change, we would need to make this an `Observable`.
        from(providers.privateStateProvider.get(carbonCreditPrivateStateKey) as Promise<CarbonCreditPrivateState>),
      ],
      // ...and combine them to produce the required derived state.
      (ledgerState, privateState) => {
        const hashedSecretKey = CarbonCredit.pureCircuits.publicKey(
          privateState.secretKey,
          convertFieldToBytes(32, ledgerState.sequence, 'api/src/index.ts'),
        );

        return {
          state: ledgerState.state,
          message: ledgerState.message.value,
          sequence: ledgerState.sequence,
          isOwner: toHex(ledgerState.owner) === toHex(hashedSecretKey),
        };
      },
    );
  }

  /**
   * Gets the address of the current deployed contract.
   */
  readonly deployedContractAddress: ContractAddress;

  /**
   * Gets an observable stream of state changes based on the current public (ledger),
   * and private state data.
   */
  readonly state$: Observable<CarbonCreditDerivedState>;

  /**
   * Attempts to recordCredit a given message to the carbon credit tracker.
   *
   * @param message The message to recordCredit.
   *
   * @remarks
   * This method can fail during local circuit execution if the carbon credit tracker is currently occupied.
   */
  async recordCredit(message: string): Promise<void> {
    this.logger?.info(`recordingCredit: ${message}`);

    const txData = await this.deployedContract.callTx.recordCredit(message);

    this.logger?.trace({
      transactionAdded: {
        circuit: 'recordCredit',
        txHash: txData.public.txHash,
        blockHeight: txData.public.blockHeight,
      },
    });
  }

  /**
   * Attempts to take down any currently posted message on the carbon credit tracker.
   *
   * @remarks
   * This method can fail during local circuit execution if the carbon credit tracker is currently vacant,
   * or if the currently posted message isn't owned by the owner computed from the current private
   * state.
   */
  async retireCredit(): Promise<void> {
    this.logger?.info('retiringCredit');

    const txData = await this.deployedContract.callTx.retireCredit();

    this.logger?.trace({
      transactionAdded: {
        circuit: 'retireCredit',
        txHash: txData.public.txHash,
        blockHeight: txData.public.blockHeight,
      },
    });
  }

  /**
   * Deploys a new carbon credit tracker contract to the network.
   *
   * @param providers The carbon credit tracker providers.
   * @param logger An optional 'pino' logger to use for logging.
   * @returns A `Promise` that resolves with a {@link CarbonCreditAPI} instance that manages the newly deployed
   * {@link DeployedCarbonCreditContract}; or rejects with a deployment error.
   */
  static async deploy(providers: CarbonCreditProviders, logger?: Logger): Promise<CarbonCreditAPI> {
    logger?.info('deployContract');

    const deployedCarbonCreditContract = await deployContract(providers, {
      compiledContract: CompiledCarbonCreditContractContract,
      privateStateId: carbonCreditPrivateStateKey,
      initialPrivateState: createCarbonCreditPrivateState(utils.randomBytes(32)),
    });

    logger?.trace({
      contractDeployed: {
        finalizedDeployTxData: deployedCarbonCreditContract.deployTxData.public,
      },
    });

    return new CarbonCreditAPI(deployedCarbonCreditContract, providers, logger);
  }

  /**
   * Finds an already deployed carbon credit tracker contract on the network, and joins it.
   *
   * @param providers The carbon credit tracker providers.
   * @param contractAddress The contract address of the deployed carbon credit tracker contract to search for and join.
   * @param logger An optional 'pino' logger to use for logging.
   * @returns A `Promise` that resolves with a {@link CarbonCreditAPI} instance that manages the joined
   * {@link DeployedCarbonCreditContract}; or rejects with an error.
   */
  static async join(providers: CarbonCreditProviders, contractAddress: ContractAddress, logger?: Logger): Promise<CarbonCreditAPI> {
    logger?.info({
      joinContract: {
        contractAddress,
      },
    });

    const deployedCarbonCreditContract = await findDeployedContract<CarbonCreditContract>(providers, {
      contractAddress,
      compiledContract: CompiledCarbonCreditContractContract,
      privateStateId: carbonCreditPrivateStateKey,
      initialPrivateState: await CarbonCreditAPI.getPrivateState(providers, contractAddress),
    });

    logger?.trace({
      contractJoined: {
        finalizedDeployTxData: deployedCarbonCreditContract.deployTxData.public,
      },
    });

    return new CarbonCreditAPI(deployedCarbonCreditContract, providers, logger);
  }

  private static async getPrivateState(
    providers: CarbonCreditProviders,
    contractAddress: ContractAddress,
  ): Promise<CarbonCreditPrivateState> {
    providers.privateStateProvider.setContractAddress(contractAddress);
    const existingPrivateState = await providers.privateStateProvider.get(carbonCreditPrivateStateKey);
    return existingPrivateState ?? createCarbonCreditPrivateState(utils.randomBytes(32));
  }
}

/**
 * A namespace that represents the exports from the `'utils'` sub-package.
 *
 * @public
 */
export * as utils from './utils/index.js';

export * from './common-types.js';
