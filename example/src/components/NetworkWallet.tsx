import React from 'react';
import { Platform } from 'react-native';
import { importNetworkWalletSync } from 'react-native-tron-sdk';
import CustomButton from './Button';
import Container from './Container';
import Heading from './Heading';

const seed =
  'pledge riot bitter save galaxy mad machine rely glare control round small';
const NetworkWallet = () => {
  const handleCreateWallet = () => {
    try {
      const data = importNetworkWalletSync(seed, 'dogecoin', '');
      console.log(`Res on ${Platform.OS} `, data);
    } catch (error) {
      console.log('E', error);
    }
  };
  return (
    <Container>
      <Heading title="Create Network wallet" />
      <CustomButton title="Create Wallet" onPress={handleCreateWallet} />
    </Container>
  );
};

export default NetworkWallet;
