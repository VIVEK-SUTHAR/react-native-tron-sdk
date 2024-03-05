global.Buffer = require('buffer').Buffer;

import { NativeModules, Platform } from 'react-native';
import sendTrxTransaction from './tron-api/sendTrxTransaction';
import sendTrc20Transaction from './tron-api/sendTrc20Transaction';
import type { BroadcastTransactionResponse } from './tron-api/broadcastTransaction';
import { TronRpc } from './tron-rpc';
import 'react-native-get-random-values';
import '@ethersproject/shims';
const LINKING_ERROR =
  `The package 'react-native-tron-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const TronSdkModule = isTurboModuleEnabled
  ? require('./NativeTronSdk').default
  : NativeModules.TronSdk;

const TronSdk = TronSdkModule
  ? TronSdkModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function setRpcUrl(rpcUrl: string): void {
  TronRpc.setRpcUrl(rpcUrl);
}

export type CreateWalletResponse = {
  privateKey: string;
  publicKey: string;
  seedPhrase: string;
};
export type ImportWallerResponse = CreateWalletResponse;
/**
 * Creates a new multi-coin wallet
 * By default, the Wallet is created with 128 bits of entropy and encrypted with an empty passphrase
 * If you want to encrypt the wallet, you can pass a passphrase as an argument
 * The passphrase is used to encrypt the wallet and is required to decrypt it
 *
 * @param passphrase The passphrase to encrypt the wallet
 * @returns CreateWalletResponse
 */
export function createWallet(
  passphrase: string = ''
): Promise<CreateWalletResponse> {
  return TronSdk.createWallet(passphrase);
}

/**
 * Imports a wallet
 * @param seedPhrase The seed phrase to import
 * @param passphrase The passphrase to decrypt the wallet
 * @returns string
 * */
export function importWallet(
  seedPhrase: string,
  passphrase: string = ''
): Promise<ImportWallerResponse> {
  if (!seedPhrase) {
    throw new Error('Seed phrase is required');
  }
  return TronSdk.importWallet(seedPhrase, passphrase);
}
/**
 * Signs a message
 * @param message The message to sign
 * @param privateKey private key to sign the message
 * @returns string
 */
export function signMessage(
  message: string,
  privateKey: string
): Promise<string> {
  if (!message) {
    throw new Error('Message is required');
  }
  if (!privateKey) {
    throw new Error('Private key is required');
  }
  return TronSdk.signMessage(message, privateKey);
}

export type SendTransactionOptions = {
  owner_address: string;
  to_address: string;
  amount: number;
  private_key: string;
  contract_address?: string;
};

/**
 * Sends a transaction
 * @param options The transaction options
 * @returns string
 *
 * The amount should be in SUN,See the example below
 *
 * Note: If the contract_address is not provided, the function sends a TRX transaction
 * If the contract_address is provided, the function sends a TRC20 transaction
 * @example
 * ```javascript
 * const txnOptions: SendTransactionOptions = {
 * owner_address: "OWNER_ADDRESS",
 * to_address: "TO_ADDRESS",
 * amount: ,
 * private_key: PRIVATE_KEY,
 * };
 * const hash = await sendTransaction(txnOptions);
 * console.log('Transaction Hash: ', hash);
 * ```
 */
export function sendTransaction(
  options: SendTransactionOptions
): Promise<BroadcastTransactionResponse> {
  const requiredFields: Array<keyof SendTransactionOptions> = [
    'owner_address',
    'to_address',
    'amount',
    'private_key',
  ];
  for (const field of requiredFields) {
    if (!options[field]) {
      throw new Error(`${field.replace('_', ' ')} is required`);
    }
  }
  if (!options.contract_address) {
    return sendTrxTransaction(options);
  }
  return sendTrc20Transaction(options);
}

/**
 * 1 TRX = 1,000,000 SUN
 * 1 SUN = 0.000001 TRX
 * Sun is the smallest unit of TRX
 *
 */
const TRX_TO_SUN_FACTOR = 1e6;

// Function to convert TRX to SUN
export function trxToSun(trxAmount: number) {
  return trxAmount * TRX_TO_SUN_FACTOR;
}

// Function to convert SUN to TRX
export function sunToTrx(sunAmount: number) {
  return sunAmount / TRX_TO_SUN_FACTOR;
}

/**
 * Signs a transaction
 * @param tx The transaction to sign
 * @param privateKey The private key to sign the transaction
 * @returns string
 * */
export function signTxId(txId: string, privateKey: string): Promise<string> {
  if (!txId) {
    throw new Error('Transaction ID is required');
  }
  if (!privateKey) {
    throw new Error('Private key is required');
  }
  return TronSdk.signTxId(txId, privateKey);
}
