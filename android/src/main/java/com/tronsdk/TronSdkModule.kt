package com.tronsdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.google.protobuf.ByteString
import wallet.core.java.AnySigner
import wallet.core.jni.CoinType
import wallet.core.jni.HDWallet
import wallet.core.jni.PrivateKey
import wallet.core.jni.TronMessageSigner
import wallet.core.jni.proto.Tron


class TronSdkModule internal constructor(context: ReactApplicationContext) : TronSdkSpec(context) {
  init {
    System.loadLibrary("TrustWalletCore")
  }

  override fun getName(): String {
    return NAME
  }


  private fun generateWalletData(passPhrase: String?): WritableMap {
    val newWallet = HDWallet(128, passPhrase)
    val publicKey = newWallet.getAddressForCoin(CoinType.TRON)
    val rawPrivateKey = newWallet.getKeyForCoin(CoinType.TRON)
    val privateKey = Numeric.toHexString(rawPrivateKey.data())
    val mnemonic = newWallet.mnemonic()
    val result = Arguments.createMap()
    result.putString("publicKey", publicKey)
    result.putString("privateKey", Numeric.cleanHexPrefix(privateKey))
    result.putString("mnemonic", mnemonic)
    return result
  }

  private fun _importWallet(seedPhrase: String, passPhrase: String?): WritableMap {
    val passphrase = passPhrase ?: ""
    val wallet = HDWallet(seedPhrase, passphrase)
    val coinTron: CoinType = CoinType.TRON
    val rawPrivateKey = wallet.getKeyForCoin(CoinType.TRON)
    val privateKey = Numeric.toHexString(rawPrivateKey.data())
    val output = Arguments.createMap()
    val tronAddress = wallet.getAddressForCoin(coinTron)
    output.putString("publicKey", tronAddress)
    output.putString("privateKey", Numeric.cleanHexPrefix(privateKey))
    return output
  }

  @ReactMethod
  override fun createWallet(passPhrase: String?, promise: Promise) {
    val walletData = generateWalletData(passPhrase)
    promise.resolve(walletData)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun createWalletSync(passPhrase: String?): WritableMap {
    return generateWalletData(passPhrase)
  }

  @ReactMethod
  override fun importWallet(seedPhrase: String, passPhrase: String?, promise: Promise) {
    val output = _importWallet(seedPhrase, passPhrase)
    promise.resolve(output)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun importWalletSync(seedPhrase: String, passPhrase: String?):WritableMap {
    return _importWallet(seedPhrase,passPhrase)
  }


  @ReactMethod
  override fun signTxId(transactionId: String, privateKey: String, promise: Promise) {
    val walletPrivateKey = ByteString.copyFrom(privateKey.toHexByteArray())
    val signingInput =
      Tron.SigningInput.newBuilder().setTxId(transactionId).setPrivateKey(walletPrivateKey)
    val output = AnySigner.sign(signingInput.build(), CoinType.TRON, Tron.SigningOutput.parser())
    promise.resolve(Numeric.toHexString(output.signature.toByteArray()))
  }

  @ReactMethod
  override fun signMessage(messageToSign: String, privateKey: String, promise: Promise) {
    val data = Numeric.hexStringToByteArray(privateKey)
    val walletPrivateKey = PrivateKey(data)
    val signature = TronMessageSigner.signMessage(walletPrivateKey, messageToSign)
    promise.resolve(signature)
  }

  private fun String.toHexByteArray(): ByteArray {
    return Numeric.hexStringToByteArray(this)
  }

  companion object {
    const val NAME = "TronSdk"
  }
}
