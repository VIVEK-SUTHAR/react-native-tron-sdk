import { Alert, Linking, View } from 'react-native';
import React, { useState } from 'react';
import {
  sendTransaction,
  type SendTransactionOptions,
} from 'react-native-tron-sdk';
import Container from './Container';
import { displaySubstring } from '../util/withPerf';
import Heading from './Heading';
import CustomButton from './Button';
import Row from './Row';
import type { BroadcastTransactionResponse } from '../../../src/tron-api/broadcastTransaction';
//Burner Wallet Keys, this is for testing purpose only :D
const PRIVATE_KEY =
  'YOUR_KEY';
const OWNER_ADDRESS = 'TBzqeS1xg8zkXp3crQS4G7H4tNGr4ZncVf';
const TO = 'TD7brZsySwVozYdwt4wV4A6mV1NeXnEKqo';
const EXPLORER_LINK = 'https://nile.tronscan.org/#/transaction/';
const USDT_CONTRACT_ADDRESS_NILE = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj';

const SendTRC20Transaction = () => {
  const [txnResponse, settxnResponse] =
    useState<BroadcastTransactionResponse>();
  const [isSending, setIsSending] = useState(false);

  const handleTrxTransfer = async () => {
    if (isSending) {
      return;
    }
    setIsSending(true);
    try {
      const txnOptions: SendTransactionOptions = {
        owner_address: OWNER_ADDRESS,
        to_address: TO,
        amount: 500000000, //500 USDT
        private_key: PRIVATE_KEY,
        contract_address: USDT_CONTRACT_ADDRESS_NILE,
      };
      const res = await sendTransaction(txnOptions);
      console.log('Transaction ', res);
      settxnResponse(res);
    } catch (error) {
      console.log('Error: ', error);
      Alert.alert('Error in sending transaction');
    } finally {
      setIsSending(false);
    }
  };
  const handleExplorerLink = () => {
    if (txnResponse) {
      console.log('Explorer Link', EXPLORER_LINK + txnResponse.txid);
      Linking.openURL(EXPLORER_LINK + txnResponse.txid);
    }
  };
  return (
    <Container>
      <Heading title="Send 500 USDT" />
      <CustomButton title="Send Now" onPress={handleTrxTransfer} />
      <View>
        {isSending && <Row title="Transaction Status" value="Sending.." />}
        {txnResponse && (
          <View>
            <Row
              title="Success"
              value={txnResponse.result === true ? 'Yes' : 'No'}
            />
            <Row title="Hash" value={displaySubstring(txnResponse.txid)} />
            <CustomButton
              title="View on Explorer"
              onPress={handleExplorerLink}
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default SendTRC20Transaction;
