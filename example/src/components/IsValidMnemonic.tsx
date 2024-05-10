import { Platform } from 'react-native';
import React from 'react';
import { isValidMnemonic } from 'react-native-tron-sdk';
import Container from './Container';
import CustomButton from './Button';

const VALID_SEED =
  'chase shock combine boy book spawn swarm pause involve verb hover army';
const INVALID_SEED =
  'chase shock combine boy bok spawn swarm pause involve verb hover army';
const IsValidMnemonic = () => {
  const handleValidMnemonic = () => {
    const isValid = isValidMnemonic(VALID_SEED);
    console.log(`${Platform.OS} Is Valid`, isValid);
  };
  const handleInValidMnemonic = () => {
    const isValid = isValidMnemonic(INVALID_SEED);
    console.log(`${Platform.OS} Is Valid`, isValid);
  };
  return (
    <Container>
      <CustomButton
        title="Check For Valid (Valid Case)"
        onPress={handleValidMnemonic}
      />
      <CustomButton
        title="Check For InValid (InValid Case)"
        onPress={handleInValidMnemonic}
      />
    </Container>
  );
};

export default IsValidMnemonic;
