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
    
    private func generateWalletData(_ passPhrase: String) -> NSDictionary {
        let wallet = HDWallet(strength: 128, passphrase: passPhrase)
        let mnemonic = wallet?.mnemonic
        let publicKey = wallet?.getAddressForCoin(coin: .tron)
        let privateKey = wallet?.getKeyForCoin(coin: .tron).data.hexString
        print("Generate Wallet Sync Method")
        let result: NSDictionary = [
            "publicKey": publicKey!,
            "privateKey": privateKey!,
            "seedPhrase": mnemonic!
        ]
        return result
    }
    
    private func importWalletData(_ mnemonic:String,passphrase:String)->NSDictionary {
        let wallet = HDWallet(mnemonic: mnemonic, passphrase: passphrase)
        let mnemonic=wallet?.mnemonic
        let publicKey=wallet?.getAddressForCoin(coin: .tron)
        let privatekey=wallet?.getKeyForCoin(coin: .tron).data.hexString
        let result: NSDictionary = [
            "publicKey": publicKey!,
            "privateKey":privatekey!,
            "seedPharse":mnemonic!
        ]
        print("Import Wallet Sync 😁")
        return result
    }

    @objc
    func createWallet(_ passPhrase: String?, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let result=generateWalletData(passPhrase ?? "")
        resolver(result)
    }
    
    @objc
    func createWalletSync(_ passPhrase:String)->NSDictionary {
        return generateWalletData(passPhrase)
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
    func importWalletSync(_ mnemonic:String,passphrase:String?)->NSDictionary {
        return importWalletData(mnemonic, passphrase: passphrase ?? "")
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

    @objc 
    func importNetworkWalletSync(_ seedPhrase:String,networkName:String,passPhrase:String)->NSDictionary{
     let coin=getCoinFromNetwork(networkName: networkName);
        let wallet = HDWallet(mnemonic: seedPhrase, passphrase: passPhrase)
        let publicKey=wallet?.getAddressForCoin(coin: coin)
        let rawPrivatekey=wallet?.getKeyForCoin(coin: coin)
        let resPrivateKey: String? = networkName == "solana" ? make64BytesPrivateKey(privateKey: rawPrivatekey!) : rawPrivatekey?.data.hexString

        let result: NSDictionary = [
            "publicKey": publicKey!,
            "privateKey":resPrivateKey!,
        ]
        return result
    }
    
    private func getCoinFromNetwork(networkName:String)->CoinType{
        switch networkName {
        case "solana":
            return .solana
        case "bitcoin":
            return .bitcoin
        case "ethereum":
            return .ethereum
        case "tron":
            return .tron
        case "dogecoin":
            return .dogecoin
        default:
            return .bitcoin
        }
    }
    
    func make64BytesPrivateKey(privateKey: PrivateKey) -> String {
        var outputStream = Data()
        outputStream.append(privateKey.data)
        outputStream.append(privateKey.getPublicKeyEd25519().data)
        let encodedPrivateKey = Base58.encodeNoCheck(data: outputStream)
        let log = String(format: "### solana 64bytes private key bs58 : %@", encodedPrivateKey)
        print(log)

        return encodedPrivateKey
    }
}
