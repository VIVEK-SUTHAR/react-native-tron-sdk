package com.tronsdk

import com.facebook.react.bridge.ReactApplicationContext

abstract class TronSdkSpec internal constructor(context: ReactApplicationContext) :
  NativeTronSdkSpec(context) {
}
