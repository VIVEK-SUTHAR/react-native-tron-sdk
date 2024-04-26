import { TronRpc } from '../tron-rpc';
import { base58ToTronAddress, encodeParams } from './sendTrc20Transaction';

type EstimateTrc20TransferEnergyParams = {
  owner_address: string;
  to_address: string;
  amount: number;
  contract_address: string;
};
async function estimateTrc20TransferEnergy(
  options: EstimateTrc20TransferEnergyParams
) {
  try {
    let inputs = [
      { type: 'address', value: base58ToTronAddress(options.to_address) },
      { type: 'uint256', value: options.amount },
    ];
    let encodedParameters = encodeParams(inputs);
    let txnOptions = {
      owner_address: options.owner_address,
      contract_address: options.contract_address!,
      function_selector: 'transfer(address,uint256)',
      parameter: encodedParameters,
      visible: true,
    };
    const URL = TronRpc.currentRpcUrl + 'walletsolidity/estimateenergy';
    let bodyContent = JSON.stringify(txnOptions);
    let response = await fetch(URL, {
      method: 'POST',
      body: bodyContent,
      headers: TronRpc.commonHeaders,
    });
    const jsonResponse = await response.json();
    if (jsonResponse && jsonResponse.Error) {
      throw new Error(
        `Error Estimating TRC20 Transaction Energy ${jsonResponse.Error}`
      );
    }
    return jsonResponse;
  } catch (error) {
    throw error;
  }
}

export default estimateTrc20TransferEnergy;
