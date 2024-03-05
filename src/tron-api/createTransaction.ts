import { TronRpc } from '../tron-rpc';

export type CreateTransactionRequest = {
  owner_address: string;
  to_address: string;
  amount: number;
};
type CreateTransactionResponse = {
  visible: boolean;
  txID: string;
  raw_data: RawData;
  raw_data_hex: string;
};
type RawData = {
  contract: Contract[];
  ref_block_bytes: string;
  ref_block_hash: string;
  expiration: number;
  timestamp: number;
};
type Contract = {
  parameter: Parameter;
  type: string;
};
type Parameter = {
  value: Value;
  type_url: string;
};
type Value = {
  amount: number;
  owner_address: string;
  to_address: string;
};
export default async function createTransaction(
  options: CreateTransactionRequest
): Promise<CreateTransactionResponse> {
  const { owner_address, to_address, amount } = options;
  if (!owner_address || !to_address || !amount) {
    throw new Error('owner_address, to_address and amount are required');
  }
  try {
    let bodyContent = JSON.stringify({
      owner_address: owner_address,
      to_address: to_address,
      visible: true,
      amount: amount,
    });
    const URL = TronRpc.currentRpcUrl + '/wallet/createtransaction';
    let response = await fetch(URL, {
      method: 'POST',
      body: bodyContent,
      headers: TronRpc.commonHeaders,
    });
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.Error) {
      throw new Error(`Error creating transaction: ${jsonResponse.Error}`);
    }

    // If the response does not contain an error, return the data
    return jsonResponse;
  } catch (error) {
    throw new Error('Unknown error occurred while creating transaction');
  }
}
