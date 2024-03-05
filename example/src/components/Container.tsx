import { StyleSheet, View } from 'react-native';
import React, { type FC, type PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.conatiner}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: '#232D3F',
    padding: 12,
    width: '90%',
    borderRadius: 10,
    gap: 4,
  },
});
