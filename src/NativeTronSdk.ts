import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type CreateWalletResponse = {
  privateKey: string;
  publicKey: string;
  seedPhrase: string;
};
type ImportWallerResponse = CreateWalletResponse;
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
}

export default TurboModuleRegistry.getEnforcing<Spec>('TronSdk');
