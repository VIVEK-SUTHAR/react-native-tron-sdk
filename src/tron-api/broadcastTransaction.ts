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
    let headersList = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    };
    let broadcastResponse = await fetch(
      'https://nile.trongrid.io/wallet/broadcasttransaction',
      {
        method: 'POST',
        body: signedTransaction,
        headers: headersList,
      }
    );
    let broadcastData = await broadcastResponse.json();
    return broadcastData;
  } catch (error) {
    throw new Error(`Error broadcasting transaction: ${error}`);
  }
}
