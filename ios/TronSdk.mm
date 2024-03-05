#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TronSdk, NSObject)

RCT_EXTERN_METHOD(createWallet:(NSString *)passPhrase resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(importWallet:(NSString *) mnemonic passphrase: (NSString *)passphrase resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(signMessage:(NSString *) message privatekey: (NSString *)privatekey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(signTxId:(NSString *) txId privatekey: (NSString *)privatekey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

@end
