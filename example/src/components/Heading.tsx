import { StyleSheet, Text } from 'react-native';
import React from 'react';

const Heading = ({ title }: { title: string }) => {
  return <Text style={styles.heading}>{title}</Text>;
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    margin: 20,
  },
});
