import * as React from 'react';

import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import SignMessage from './components/SignMessage';
import SendTransaction from './components/SendTransaction';
import Heading from './components/Heading';
import SendTRC20Transaction from './components/SendTRC20Txn';
import AllTransactions from './components/AllTransactions';
import { getTokenBalance, init } from 'react-native-tron-sdk';
import NetworkWallet from './components/NetworkWallet';
init('https://api.trongrid.io');
export default function App() {
  React.useEffect(() => {
    getTokenBalance(
      'TUSDrNLjGLLyGTP95AVWPfk65DLJTdGA2R',
      'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    )
      .then((re) => {
        console.log('res', re);
      })
      .catch((e) => {
        console.log('err', e);
      });
  }, []);

  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle="light-content" backgroundColor={'#0F0F0F'} />
      <ScrollView
        scrollEnabled={true}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Heading title="Tron Examples" />
        <NetworkWallet />
        <AllTransactions />
        <CreateWallet />
        <ImportWallet />
        <SendTransaction />
        <SendTRC20Transaction />
        <SignMessage />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },

  container: {
    backgroundColor: '#0F0F0F',
  },
  contentContainer: {
    alignItems: 'center',
    gap: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
