import { View } from 'react-native';
import React, { useState } from 'react';
import { getTokenDecimals } from 'react-native-tron-sdk';
import Container from './Container';
import Heading from './Heading';
import CustomButton from './Button';
import Row from './Row';
const TokenDecimals = () => {
  const [decimals, setDecimals] = useState<number | undefined>(undefined);
  async function handleGetDecimals() {
    getTokenDecimals(
      'TDdy7CNGj9xc49wumNySbLwgRj2YEM7qku',
      'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    )
      .then((decimal) => setDecimals(decimal))
      .catch((err) => console.log(err));
  }
  return (
    <Container>
      <Heading title="Token Decimals" />
      <CustomButton title="Get Token Decimals" onPress={handleGetDecimals} />
      <View>
        {decimals && (
          <View>
            <Row title="Signature" value={decimals?.toString()} />
          </View>
        )}
      </View>
    </Container>
  );
};

export default TokenDecimals;
