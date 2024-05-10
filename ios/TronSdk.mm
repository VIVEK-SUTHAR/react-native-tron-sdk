#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TronSdk, NSObject)

RCT_EXTERN_METHOD(createWallet:(NSString *)passPhrase resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(importWallet:(NSString *) mnemonic passphrase: (NSString *)passphrase resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(signMessage:(NSString *) message privatekey: (NSString *)privatekey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(signTxId:(NSString *) txId privatekey: (NSString *)privatekey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(createWalletSync:(NSString *)passPhrase)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(importWalletSync:(NSString *) mnemonic passphrase: (NSString *)passphrase)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(importNetworkWalletSync:(NSString *)seedPhrase networkName:(NSString *)networkName passPhrase:(NSString *)passPhrase  derivationPath:(NSString *)derivationPath)

RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(isValidMnemonic:(NSString *)seedPhrase)
@end
