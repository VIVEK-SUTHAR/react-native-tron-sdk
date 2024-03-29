import { TronRpc } from '../tron-rpc';
import type { GetTokenBalanceRequest } from './accounts/getTokenBalance';
import { base58ToTronAddress, decodeParams } from './sendTrc20Transaction';

const ResponseCache = new Map<string, number>();

type GetContractDecimals = GetTokenBalanceRequest;
async function getContractDecimals({
  address,
  tokenAddress,
}: GetContractDecimals) {
  try {
    if (ResponseCache.has(tokenAddress)) {
      return ResponseCache.get(tokenAddress);
    }

    const URL = TronRpc.currentRpcUrl + '/wallet/triggerconstantcontract';
    let bodyContent = JSON.stringify({
      owner_address: base58ToTronAddress(address),
      contract_address: base58ToTronAddress(tokenAddress),
      function_selector: 'decimals()',
    });
    let response = await fetch(URL, {
      method: 'POST',
      body: bodyContent,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    const decoded = decodeParams(
      ['uint256'],
      `0x${responseJson?.constant_result}`,
      false
    );
    const decimals = parseInt(decoded[0]);
    ResponseCache.set(tokenAddress, decimals);
    return decimals;
  } catch (error) {
    throw error;
  }
}

export default getContractDecimals;
