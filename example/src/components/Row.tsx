import { StyleSheet, Text, View } from 'react-native';
import React, { type FC } from 'react';

type RowProps = {
  title: string;
  value: string;
};
const Row: FC<RowProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.key}>{title}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  key: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  value: {
    fontSize: 20,
    color: 'white',
  },
});
