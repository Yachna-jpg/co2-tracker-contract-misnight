import { PreprodRemoteConfig } from './config.js';
import { createLogger } from './logger-utils.js';
import { MidnightWalletProvider } from './midnight-wallet-provider.js';
import { unshieldedToken } from '@midnight-ntwrk/midnight-js-protocol/ledger';
import { getInitialUnshieldedState } from './wallet-utils.js';

async function run() {
  console.log("Setting up config...");
  const config = new PreprodRemoteConfig();
  const logger = await createLogger(config.logDir);

  // Hardcode the env configuration to bypass the testEnv.start() health checks!
  const envConfiguration = {
    walletNetworkId: 'preprod',
    networkId: 'preprod',
    indexer: "https://indexer.preprod.midnight.network/api/v4/graphql",
    indexerWS: "wss://indexer.preprod.midnight.network/api/v4/graphql/ws",
    node: "https://rpc.preprod.midnight.network",
    nodeWS: "wss://rpc.preprod.midnight.network",
    faucet: "https://midnight-tmnight-preprod.nethermind.dev/",
    proofServer: "http://localhost:32769"
  };

  const seed = 'e87a71b184ba92874aa8c6d4d40770709a294075004f76c24e9167a9a428237e';
  console.log("Building wallet with seed:", seed);
  const walletProvider = await MidnightWalletProvider.build(logger, envConfiguration as any, seed);

  console.log("Starting wallet...");
  await walletProvider.start();

  console.log("Fetching unshielded state...");
  const initialState = await getInitialUnshieldedState(logger, walletProvider.wallet.unshielded);
  const initialBalance = initialState.balances[unshieldedToken().raw];

  console.log('=============================================');
  console.log('YOUR WALLET BALANCE IS:', initialBalance?.toString() || '0');
  console.log('=============================================');

  // Close the wallet
  await walletProvider.stop();
  process.exit(0);
}

run().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});
