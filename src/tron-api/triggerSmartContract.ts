import { TronRpc } from '../tron-rpc';

export type SendSmartContractOptions = {
  owner_address: string;
  contract_address: string;
  function_selector: string;
  parameter: string;
  fee_limit: number;
  call_value: number;
  visible: boolean;
};
export default async function triggerSmartContract(
  options: SendSmartContractOptions
) {
  try {
    const URL = TronRpc.currentRpcUrl + '/wallet/triggersmartcontract';
    let bodyContent = JSON.stringify(options);
    let response = await fetch(URL, {
      method: 'POST',
      body: bodyContent,
      headers: TronRpc.commonHeaders,
    });
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.Error) {
      throw new Error(`Error Sending TRC20 Transaction ${jsonResponse.Error}`);
    }

    // If the response does not contain an error, return the data
    return jsonResponse;
  } catch (error) {}
}
