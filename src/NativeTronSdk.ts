import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  CreateWalletResponse,
  ImportWallerResponse,
} from 'react-native-tron-sdk';

export interface Spec extends TurboModule {
  createWallet(passPhrase?: string): Promise<CreateWalletResponse>;
  importWallet(
    seedPhrase: string,
    passPhrase?: string
  ): Promise<ImportWallerResponse>;
  signTxId(transactionId: string, privateKey: string): Promise<string>;
  signMessage(messageToSign: string, privateKey: string): Promise<string>;
  createWalletSync(passPhrase?: string): CreateWalletResponse;
  importWalletSync(
    seedPhrase: string,
    passPhrase?: string
  ): ImportWallerResponse;
  importNetworkWalletSync(
    seedPhrase: string,
    network: 'bitcoin' | 'solana' | 'ethereum' | 'tron' | 'dogecoin',
    passphrase: string,
    derivationPath: string
  ): Omit<ImportWallerResponse, 'seedPhrase'>;
  isValidMnemonic(seedPhrase: string): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TronSdk');
