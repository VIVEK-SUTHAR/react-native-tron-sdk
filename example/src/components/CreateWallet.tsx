import { View } from 'react-native';
import React, { useState } from 'react';
import {
  type CreateWalletResponse, createWalletSync
} from 'react-native-tron-sdk';
import Container from './Container';
import { displaySubstring } from '../util/withPerf';
import Heading from './Heading';
import CustomButton from './Button';
import Row from './Row';

const CreateWallet = () => {
  const [walletResponse, setWalletResponse] = useState<CreateWalletResponse>();

  async function handleCreateWallet() {
    try {
      //Synchornous Method
      const res = createWalletSync();
      setWalletResponse(res);
      //Asynchornous Method
      //const asyncWallet=await createWallet();
      //setWalletResponse(asyncWallet);
    } catch (error) {
      console.log('Error', error);
    }
  }
  return (
    <Container>
      <Heading title="Create a new wallet" />
      <CustomButton title="Create Wallet" onPress={handleCreateWallet} />
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

export default CreateWallet;
