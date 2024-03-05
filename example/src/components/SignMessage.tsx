import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import { signMessage } from 'react-native-tron-sdk';
import Container from './Container';
import { displaySubstring } from '../util/withPerf';
import Heading from './Heading';
import CustomButton from './Button';
import Row from './Row';
const PRIVATE_KEY =
  'YOUR_KEY';
const TEST_MESSAGE =
  'HELLO WORLD! This is a test message to be signed by the wallet';
const SignMessage = () => {
  const [signature, setSignature] = useState<string | null>(null);

  async function handleImportWallet() {
    signMessage(TEST_MESSAGE, PRIVATE_KEY)
      .then((response) => {
        setSignature(response);
      })
      .catch((error) => {
        console.log('Error: ', error);
        Alert.alert('Error', error.message);
      });
  }
  return (
    <Container>
      <Heading title="Sign Message With P.K" />
      <CustomButton title="Sign Now" onPress={handleImportWallet} />
      <View>
        {signature && (
          <View>
            <Row title="Signature" value={displaySubstring(signature)} />
          </View>
        )}
      </View>
    </Container>
  );
};

export default SignMessage;
