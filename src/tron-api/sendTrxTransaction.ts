import createTransaction from './createTransaction';
import { signTxId, type SendTransactionOptions } from '../index';
import { broadcastTransaction } from './broadcastTransaction';
export default async function sendTrxTransaction(
  options: SendTransactionOptions
) {
  try {
    let txOptions = {
      ...options,
      visible: true,
    };
    const data = await createTransaction(txOptions);
    console.log(data.txID);
    let sig = await signTxId(data.txID, options.private_key);
    // Add signature to the transaction
    //@ts-expect-error: The signature is added to the transaction,as the signature is not present in the createTransaction function
    //and the signature is added by signTxId function
    data.signature = [sig];
    console.log('Signature: ', sig);
    const broadcastTxnRequest = {
      signedTransaction: JSON.stringify(data),
    };
    let broadcastResponse = await broadcastTransaction(broadcastTxnRequest);
    return broadcastResponse;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error sending transaction', { cause: error });
  }
}
