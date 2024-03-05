import Foundation
import React
import WalletCore

@objc(TronSdk)
class TronSdk: NSObject {
    private let ERROR_INVALID_MNEMONIC = "ERROR_INVALID_MNEMONIC"
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
    return false
    }

    @objc
    func createWallet(_ passPhrase: String?, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let wallet = HDWallet(strength: 128,passphrase: passPhrase ?? "")
        let mnemonic=wallet?.mnemonic
        let publicKey=wallet?.getAddressForCoin(coin: .tron)
        let privatekey=wallet?.getKeyForCoin(coin: .tron).data.hexString
        let result: NSDictionary = [
            "publicKey": publicKey!,
            "privateKey":privatekey!,
            "seedPharse":mnemonic!
        ]
        resolver(result)
    }
    
    @objc
    func importWallet(_ mnemonic:String,passphrase:String?,resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock){
        if(!Mnemonic.isValid(mnemonic: mnemonic)){
            rejecter(ERROR_INVALID_MNEMONIC, "The mnemonic provided is invalid", nil)
            return
        }
        let wallet = HDWallet(mnemonic: mnemonic, passphrase: passphrase ?? "")
        let mnemonic=wallet?.mnemonic
        let publicKey=wallet?.getAddressForCoin(coin: .tron)
        let privatekey=wallet?.getKeyForCoin(coin: .tron).data.hexString
        let result: NSDictionary = [
            "publicKey": publicKey!,
            "privateKey":privatekey!,
            "seedPharse":mnemonic!
        ]
        resolver(result)
    }
    
    
    @objc
    func signMessage(_  message:String, privatekey:String,resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock){
        let privateKey = PrivateKey(data: Data(hexString: privatekey)!)!
        let signature = TronMessageSigner.signMessage(privateKey: privateKey, message: message)
        resolver(signature)
    }
    
    @objc
    func signTxId(_ txId:String,privatekey:String,resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock){
        let privateKey =  Data(hexString: privatekey)!
        let input = TronSigningInput.with {
            $0.privateKey = privateKey
            $0.txID = txId
        }
        let output: TronSigningOutput = AnySigner.sign(input: input, coin: .tron)
        resolver(output.signature.hexString)
        
    }
    
}
