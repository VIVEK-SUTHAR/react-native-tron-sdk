import { TronRpc } from '../tron-rpc';

type BroadcastTransactionRequest = {
  signedTransaction: string;
};
export type BroadcastTransactionResponse = {
  result: boolean;
  txid: string;
};
export async function broadcastTransaction({
  signedTransaction,
}: BroadcastTransactionRequest): Promise<BroadcastTransactionResponse> {
  try {
    const URL = TronRpc.currentRpcUrl + '/wallet/broadcasttransaction';
    let broadcastResponse = await fetch(URL, {
      method: 'POST',
      body: signedTransaction,
      headers: TronRpc.commonHeaders,
    });
    let broadcastData = await broadcastResponse.json();
    return broadcastData;
  } catch (error) {
    throw new Error(`Error broadcasting transaction: ${error}`);
  }
}
