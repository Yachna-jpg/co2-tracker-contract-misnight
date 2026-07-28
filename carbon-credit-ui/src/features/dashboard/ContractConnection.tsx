import React, { useCallback, useEffect, useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type CarbonCreditDerivedState, type DeployedCarbonCreditAPI } from '../../../../api/src/index';
import { useDeployedBoardContext } from '../../hooks';
import { type BoardDeployment } from '../../contexts';
import { type Observable } from 'rxjs';
import { State } from '../../../../contract/src/index';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock, Unlock, Copy, Edit, Trash, PlusCircle, LogIn } from 'lucide-react';

interface ContractConnectionProps {
  boardDeployment$?: Observable<BoardDeployment>;
}

const ContractConnection: React.FC<ContractConnectionProps> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedCarbonCreditAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<CarbonCreditDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>('');
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);

  const onCreateBoard = useCallback(() => boardApiProvider.resolve(), [boardApiProvider]);
  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => boardApiProvider.resolve(contractAddress),
    [boardApiProvider],
  );

  const onPostMessage = useCallback(async () => {
    if (!messagePrompt || !deployedBoardAPI) return;
    try {
      setIsWorking(true);
      await deployedBoardAPI.recordCredit(messagePrompt);
      setMessagePrompt('');
    } catch (error: any) {
      setErrorMessage(error.message || String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, messagePrompt]);

  const onDeleteMessage = useCallback(async () => {
    if (!deployedBoardAPI) return;
    try {
      setIsWorking(true);
      await deployedBoardAPI.retireCredit();
    } catch (error: any) {
      setErrorMessage(error.message || String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI]);

  const onCopyContractAddress = useCallback(async () => {
    if (deployedBoardAPI) {
      await navigator.clipboard.writeText(deployedBoardAPI.deployedContractAddress);
    }
  }, [deployedBoardAPI]);

  useEffect(() => {
    if (!boardDeployment$) return;
    const subscription = boardDeployment$.subscribe(setBoardDeployment);
    return () => subscription.unsubscribe();
  }, [boardDeployment$]);

  useEffect(() => {
    if (!boardDeployment || boardDeployment.status === 'in-progress') return;

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(boardDeployment.error.message || 'Unexpected error.');
      return;
    }

    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => subscription.unsubscribe();
  }, [boardDeployment]);

  const toShortAddress = (addr?: string) =>
    addr ? `0x${addr.replace(/^[A-Fa-f0-9]{6}([A-Fa-f0-9]{8}).*([A-Fa-f0-9]{8})$/g, '$1...$2')}` : '';

  if (!boardDeployment$) {
    return (
      <Card className="border-dashed bg-muted/30">
        <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Connect to an existing Carbon Credit contract or deploy a new one.
          </p>
          <div className="flex gap-2 w-full">
            <Button className="w-full" variant="outline" onClick={onCreateBoard}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Deploy
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => {
                const addr = prompt('Enter Contract Address');
                if (addr) onJoinBoard(addr);
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      {isWorking && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {errorMessage && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-destructive/90 text-destructive-foreground p-4 text-center">
          <p className="font-medium text-sm mb-2">{errorMessage}</p>
          <Button variant="outline" size="sm" onClick={() => setErrorMessage(undefined)} className="text-foreground">
            Dismiss
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between p-4 border-b bg-muted/20">
        <div className="flex items-center space-x-2">
          {boardState ? (
            boardState.state === State.VACANT || (boardState.state === State.OCCUPIED && boardState.isOwner) ? (
              <Unlock className="h-4 w-4 text-success" />
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )
          ) : (
            <Skeleton className="h-4 w-4 rounded-full" />
          )}
          <span className="font-mono text-sm font-medium">
            {toShortAddress(deployedBoardAPI?.deployedContractAddress) || (
              <Skeleton className="h-4 w-24 inline-block align-middle" />
            )}
          </span>
        </div>

        {deployedBoardAPI && (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCopyContractAddress}>
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {boardState ? (
          boardState.state === State.OCCUPIED ? (
            <div className="rounded-md bg-muted p-3 min-h-[100px] text-sm whitespace-pre-wrap font-mono">
              {boardState.message}
            </div>
          ) : (
            <textarea
              className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none font-mono"
              placeholder="Enter details to record credit..."
              value={messagePrompt}
              onChange={(e) => setMessagePrompt(e.target.value)}
            />
          )
        ) : (
          <Skeleton className="w-full h-[100px] rounded-md" />
        )}

        <div className="flex justify-end gap-2">
          {deployedBoardAPI && (
            <>
              <Button
                variant="default"
                size="sm"
                disabled={boardState?.state === State.OCCUPIED || !messagePrompt.trim()}
                onClick={onPostMessage}
              >
                <Edit className="mr-2 h-4 w-4" />
                Record
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={
                  boardState?.state === State.VACANT || (boardState?.state === State.OCCUPIED && !boardState.isOwner)
                }
                onClick={onDeleteMessage}
              >
                <Trash className="mr-2 h-4 w-4" />
                Retire
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ContractConnection;
