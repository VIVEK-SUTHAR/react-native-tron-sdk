import * as React from 'react';

import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import SignMessage from './components/SignMessage';
import SendTransaction from './components/SendTransaction';
import Heading from './components/Heading';
import SendTRC20Transaction from './components/SendTRC20Txn';
import AllTransactions from './components/AllTransactions';
import estimateTrc20TransferEnergy from '../../src/tron-api/estimateTrc20TransferEnergy';
import Container from './components/Container';
import Row from './components/Row';

//@ts-expect-error
const uiManager = global?.nativeFabricUIManager ? 'Fabric' : 'Paper';
const isNewArchitectureEnabled = String(uiManager === 'Fabric');
//@ts-expect-error
const isBridgeless = String(global.RN$Bridgeless === true);
//@ts-expect-error
const isInterOpEnabled = String(global.RN$TurboInterop === true);
export default function App() {
  React.useEffect(() => {
    estimateTrc20TransferEnergy({
      amount: 500000000,
      contract_address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      owner_address: 'TAj7Ud7aoeeXAukpfJW5k1XRfwKLT9bnzU',
      to_address: 'TTCb3uWdPMo7nVC8gxf2nehJ1V71ZL1Ne7',
    })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
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
        <Details />
        <Heading title="Tron Examples" />
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

function Details() {
  return (
    <Container>
      <Row title="UI Manager" value={uiManager} />
      <Row title="New Architecture" value={isNewArchitectureEnabled} />
      <Row title="Bridgeless Mode" value={isBridgeless} />
      <Row title="Interop Mode" value={isInterOpEnabled} />
    </Container>
  );
}
