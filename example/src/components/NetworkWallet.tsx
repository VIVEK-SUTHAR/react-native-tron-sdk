import React from 'react';
import { Platform } from 'react-native';
import { importNetworkWalletSync } from 'react-native-tron-sdk';
import CustomButton from './Button';
import Container from './Container';
import Heading from './Heading';

const seed =
  'chase shock combine boy book spawn swarm pause involve verb hover army';
const NetworkWallet = () => {
  const handleCreateWallet = () => {
    try {
      const startTime = performance.now();
      const data = importNetworkWalletSync(seed, 'solana', '', "m/44'/501'/0'");
      const endTime = performance.now();
      console.log(
        `Res on ${Platform.OS} \n Took ${(endTime - startTime).toFixed(4)} ms `,
        data
      );
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
