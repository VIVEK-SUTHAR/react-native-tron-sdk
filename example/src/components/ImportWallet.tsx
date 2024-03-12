import { View } from 'react-native';
import React, { useState } from 'react';
import { type ImportWallerResponse, importWalletSync } from 'react-native-tron-sdk';
import Container from './Container';
import { displaySubstring } from '../util/withPerf';
import Heading from './Heading';
import CustomButton from './Button';
import Row from './Row';

const TEST_MNEMONIC =
  'useless vacant cream flat draft obvious squeeze guess release ecology night calm';
const ImportWallet = () => {
  const [walletResponse, setWalletResponse] = useState<ImportWallerResponse>();

  async function handleImportWallet() {
    try {
      //Synchornous Method
      const res = importWalletSync(TEST_MNEMONIC);
      setWalletResponse(res);
      //Asynchornous Method
      //const asyncWallet=await importWallet(TEST_MNEMONIC);
      //setWalletResponse(asyncWallet);
    } catch (error) {
      console.log('Error', error);
   
    }
    // importWallet(TEST_MNEMONIC)
    //   .then((response) => {
    //     setWalletResponse(response);
    //   })
    //   .catch((error) => {
    //     console.log('Error: ', error);
    //     Alert.alert('Error', error.message);
    //   });
  }
  return (
    <Container>
      <Heading title="Import wallet" />
      <CustomButton title="Import Wallet" onPress={handleImportWallet} />
      <View>
        {walletResponse && (
          <View>
            <Row
              title="Address"
              value={displaySubstring(walletResponse.publicKey)}
            />
            <Row
              title="Private Key"
              value={displaySubstring(walletResponse.privateKey)}
            />
          </View>
        )}
      </View>
    </Container>
  );
};

export default ImportWallet;
