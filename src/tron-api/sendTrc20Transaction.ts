import { signTxId, type SendTransactionOptions } from 'react-native-tron-sdk';
import { broadcastTransaction } from './broadcastTransaction';
import { AbiCoder, toBeHex } from 'ethers';
import type { SendSmartContractOptions } from './triggerSmartContract';
import * as bs58 from 'bs58';
import triggerSmartContract from './triggerSmartContract';

export default async function sendTrc20Transaction(
  options: SendTransactionOptions
) {
  try {
    let inputs = [
      { type: 'address', value: base58ToTronAddress(options.to_address) },
      { type: 'uint256', value: options.amount },
    ];
    let encodedParameters = encodeParams(inputs);
    let txnOptions: SendSmartContractOptions = {
      owner_address: options.owner_address,
      contract_address: options.contract_address!,
      function_selector: 'transfer(address,uint256)',
      parameter: encodedParameters,
      fee_limit: 1000000000,
      call_value: 0,
      visible: true,
    };
    const unsignedTransaction = await triggerSmartContract(txnOptions);
    console.log('Unsigned Tx', unsignedTransaction);
    const txSig = await signTxId(
      unsignedTransaction.transaction.txID,
      options.private_key
    );
    const txToBroadcast = {
      txID: unsignedTransaction.transaction.txID,
      visible: true,
      raw_data: unsignedTransaction.transaction.raw_data,
      raw_data_hex: unsignedTransaction.transaction.raw_data_hex,
      signature: [txSig],
    };
    console.log('Signed TX', txToBroadcast);
    const stringifiedData = JSON.stringify(txToBroadcast);
    let broadcastResponse = await broadcastTransaction({
      signedTransaction: stringifiedData,
    });
    console.log('broadcastResponse: ', broadcastResponse);
    return broadcastResponse;
  } catch (error) {
    console.log('Error: ', error);
    throw new Error('Error sending transaction', { cause: error });
  }
}
const ADDRESS_PREFIX_REGEX = /^(41)/;

function encodeParams(inputs: any[]) {
  let typesValues = inputs;
  let parameters = '';
  if (typesValues.length == 0) return parameters;
  const abiCoder = new AbiCoder();
  let types = [];
  const values = [];
  for (let i = 0; i < typesValues.length; i++) {
    let { type, value } = typesValues[i];
    if (type === 'address') value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
    else if (type === 'address[]')
      value = value.map((v: string) =>
        toBeHex(v).replace(ADDRESS_PREFIX_REGEX, '0x')
      );
    types.push(type);
    values.push(value);
  }

  parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');

  return parameters;
}
function base58ToTronAddress(base58Address: string) {
  // Decode the base58 address
  const decodedAddress = bs58.decode(base58Address);
  // Remove the last 4 bytes (checksum)
  const hexString = Array.from(decodedAddress.slice(0, -4))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hexString;
}
