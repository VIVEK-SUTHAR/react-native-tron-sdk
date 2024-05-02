package com.tronsdk

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.WritableMap

abstract class TronSdkSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
    abstract  fun createWallet(passPhrase: String?,promise: Promise)
    abstract  fun createWalletSync(passPhrase: String?):WritableMap
  abstract fun importWallet(seedPhrase:String,passPhrase:String?,promise: Promise)
  abstract fun importWalletSync(seedPhrase:String,passPhrase:String?):WritableMap
  abstract fun signTxId(transactionId:String,privateKey:String,promise: Promise)
  abstract  fun signMessage(messageToSign:String,privateKey: String,promise: Promise)
  abstract fun importNetworkWalletSync(seedPhrase:String,networkName:String,passPhrase:String):WritableMap
}
