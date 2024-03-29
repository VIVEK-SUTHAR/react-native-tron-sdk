# react-native-tron-sdk

## Overview

The `react-native-tron-sdk` provides a set of functions for creating, importing, and managing multi-coin wallets on the Tron blockchain. It supports features such as creating wallets with a seed phrase, importing existing wallets, signing messages, and sending transactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Init the SDK](#init)
  - [Create a Wallet](#create-a-wallet)
  - [Import a Wallet](#import-a-wallet)
  - [Sign a Message](#sign-a-message)
  - [Send a Transaction](#send-a-transaction)
  - [Sun Conversion](#sun-conversion)

# Installation

```sh
npm install react-native-tron-sdk
```

### Android Only Setup

Since this library relies on TrustWalletCore for MultiCoin Wallet Management,and the it's android releases are hosted on GitHub packages, It needs authentication to download packages.For this You need to have a GPR Token.
You can generate a Token via below steps

- [Go to here](https://github.com/settings/tokens)
- Name your Token
- Set Expiration Time to Never
- Select `read:packages`
- Generate Token and copy it.
- Create a new `local.properties` file in your Android folder.
- Paste Below content in it

```gradle
gpr.user=YOUR_GITHUB_USER_NAME
gpr.key=YOUR_GENERATED_GPR_TOKEN
```

## Usage

### Init

Initializes the Tron SDK.
You can add your own RPC by using this method
Along with RPC url you can add an object containing custom headers to be sent with each request.
Each key is a header name and each value is the corresponding header value.
You can use this to add an API key or other authentication headers

- Note: The headers are added to every request made by the SDK
- By default, the SDK uses the Nile testnet Public RPC URL

```javascript
//App.tsx or your main entry file
import { init } from 'react-native-tron-sdk';

//Set your own rpc
init('https://YOUR_OWN_RPC');
/*  or add headers */
init('https://YOUR_OWN_RPC', {
  'X-API-KEY': 'My super key',
});
```

### Create a Wallet

Create a new multi-coin wallet with an optional passphrase for encryption:

```javascript
import { createWallet,createWalletSync } from 'react-native-tron-sdk';
const passphrase = 'my_secure_passphrase';
//Asynchornous method
const wallet = await createWallet(passphrase);
console.log(wallet);

//Synchornous Method
const res = createWalletSync();
console.log(res)

```

The createWallet function returns an object with privateKey, publicKey, and seedPhrase.

### Import a Wallet

Import an existing wallet using the seed phrase and an optional passphrase:

```javascript
import { importWallet,importWalletSync } from 'react-native-tron-sdk';
const passphrase = 'my_secure_passphrase';
const seedPharse = 'SOME SECREAT RANDOM SECURE SEED';
const wallet = await importWallet(seedPharse, passphrase);
console.log(wallet);

//Synchornous Method
const res = importWalletSync();
console.log(res)

```

The importWallet function returns the same structure as createWallet.

### Sign a Message

Sign a message using a private key:

```javascript
import { signMessage } from 'react-native-tron-sdk';
const message = 'Hello, Tron!';
const privateKey = 'your_private_key';
const signature = await signMessage(message, privateKey);
console.log(signature);
```

### Send a Transaction

Send a transaction with the specified options:
This can be used to send Native TRX Transfer as well as TRC20 Tokens

```javascript
import { sendTransaction } from 'react-native-tron-sdk';
const txnOptions = {
  owner_address: 'OWNER_ADDRESS',
  to_address: 'TO_ADDRESS',
  amount: 1000, // Amount in SUN
  private_key: 'PRIVATE_KEY',
};
const hash = await sendTransaction(txnOptions);
console.log('Transaction Hash: ', hash);
```

### Sun Conversion

Convert TRX to SUN and SUN to TRX using the provided utility functions:

```javascript
import { trxToSun, sunToTrx } from 'react-native-tron-sdk';
const trxAmount = 1.5;
const sunAmount = trxToSun(trxAmount);
console.log(`${trxAmount} TRX is equal to ${sunAmount} SUN`);

const convertedTrxAmount = sunToTrx(sunAmount);
console.log(`${sunAmount} SUN is equal to ${convertedTrxAmount} TRX`);
```

## Note

For transaction amounts, 1 TRX is equivalent to 1,000,000 SUN. The SDK includes utility functions for converting between TRX and SUN.

The SDK handles both TRX transactions and TRC20 token transactions. Specify the contract_address in the options to send a TRC20 transaction.

Ensure to handle and securely store private keys and seed phrases to maintain the security of wallets and transactions.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
