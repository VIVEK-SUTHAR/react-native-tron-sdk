# react-native-tron-sdk

## Overview

The `react-native-tron-sdk` provides a set of functions for creating, importing, and managing multi-coin wallets on the Tron blockchain. It supports features such as creating wallets with a seed phrase, importing existing wallets, signing messages, and sending transactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
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

### Create a Wallet

Create a new multi-coin wallet with an optional passphrase for encryption:

```javascript
import { createWallet } from 'react-native-tron-sdk';
const passphrase = 'my_secure_passphrase';
const wallet = await createWallet(passphrase);
console.log(wallet);
```

The createWallet function returns an object with privateKey, publicKey, and seedPhrase.

### Import a Wallet

Import an existing wallet using the seed phrase and an optional passphrase:

```javascript
import { importWallet } from 'react-native-tron-sdk';
const passphrase = 'my_secure_passphrase';
const seedPharse = 'SOME SECREAT RANDOM SECURE SEED';
const wallet = await importWallet(seedPharse, passphrase);
console.log(wallet);
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
import { trxToSun,sunToTrx } from 'react-native-tron-sdk';
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
