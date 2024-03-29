import type { GetTokenBalanceResponse } from 'react-native-tron-sdk';
import { TronRpc } from '../../tron-rpc';
import getContractDecimals from '../getContractDecimals';
import {
  base58ToTronAddress,
  decodeParams,
  encodeParams,
} from '../sendTrc20Transaction';

export type GetTokenBalanceRequest = {
  address: string;
  tokenAddress: string;
};
async function getTokenBalance({
  address,
  tokenAddress,
}: GetTokenBalanceRequest): Promise<GetTokenBalanceResponse> {
  try {
    const URL = TronRpc.currentRpcUrl + '/wallet/triggerconstantcontract';
    let bodyContent = JSON.stringify({
      owner_address: base58ToTronAddress(address),
      contract_address: base58ToTronAddress(tokenAddress),
      function_selector: 'balanceOf(address)',
      parameter: encodeParams([
        { type: 'address', value: base58ToTronAddress(address) },
      ]),
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
    const decimals = await getContractDecimals({
      address: address,
      tokenAddress: tokenAddress,
    });
    return {
      balance: parseInt(decoded[0]),
      decimals: decimals!,
    };
  } catch (error) {
    throw error;
  }
}

export default getTokenBalance;
