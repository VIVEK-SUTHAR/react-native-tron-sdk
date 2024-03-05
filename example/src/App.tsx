import * as React from 'react';

import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import SignMessage from './components/SignMessage';
import SendTransaction from './components/SendTransaction';
import Heading from './components/Heading';
import SendTRC20Transaction from './components/SendTRC20Txn';
export default function App() {
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar barStyle="light-content" backgroundColor={'#0F0F0F'} />
      <ScrollView
        scrollEnabled={true}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Heading title="Tron Examples" />
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
