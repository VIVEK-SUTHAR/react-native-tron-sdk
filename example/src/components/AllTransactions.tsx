import { View, Modal, Pressable, FlatList, Text, Image } from 'react-native';
import React, { useState, type FC } from 'react';
import Container from './Container';
import Heading from './Heading';
import CustomButton from './Button';
import { getTransactions } from 'react-native-tron-sdk';
import type { TronTransaction } from '../../../src/tron-api/accounts/getAllTrxTransactions';
import { decodeParams } from '../../../src/tron-api/sendTrc20Transaction';
import { displaySubstring } from '../util/withPerf';

const AllTransactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allTransactions, setAllTransactions] = useState<TronTransaction[]>([]);
  const openAllTransactions = () => {
    setIsOpen((prev) => !prev);
    fetchAllTransactions();
  };
  const fetchAllTransactions = () => {
    // fetch all transactions
    getTransactions({
      from: 'TBzqeS1xg8zkXp3crQS4G7H4tNGr4ZncVf',
    })
      .then((response) => {
        console.log('response', response);
        setAllTransactions(response);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };
  return (
    <Container>
      <Heading title="See All Txns" />
      <CustomButton title="Show" onPress={openAllTransactions} />
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={true}
        style={{ flex: 1 }}
      >
        <AllTxnModal data={allTransactions} handleClose={openAllTransactions} />
      </Modal>
    </Container>
  );
};

type AllTxnModalProps = {
  handleClose: () => void;
  data: TronTransaction[];
};
const AllTxnModal: FC<AllTxnModalProps> = ({ data, handleClose }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Heading title="All Transactions" />
        <Pressable onPress={handleClose}>
          <Heading title="Close" />
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <SingleTransactionCard transaction={item} />}
        keyExtractor={(item) => item.txID}
        ListEmptyComponent={() => <Heading title="No Transactions" />}
      />
    </View>
  );
};

const SingleTransactionCard = ({
  transaction,
}: {
  transaction: TronTransaction;
}) => {
  const from = transaction.raw_data.contract[0].parameter.value.owner_address;
  const to =
    transaction.raw_data.contract[0].type === 'TransferContract'
      ? transaction.raw_data.contract[0].parameter.value.to_address
      : transaction.raw_data.contract[0].parameter.value.contract_address;

  const amount =
    transaction.raw_data.contract[0].type === 'TransferContract'
      ? transaction.raw_data.contract[0].parameter.value.amount
      : transaction.raw_data.contract[0].type === 'TriggerSmartContract'
        ? parseInt(
            decodeParams(
              ['address', 'uint256'],
              transaction.raw_data.contract[0].parameter.value.data,
              true
            )[1]
          ) / 1000000
        : 0;

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Image
          source={{
            uri: 'https://assets.coingecko.com/coins/images/1094/standard/tron-logo.png?1696502193',
          }}
          style={{
            height: 36,
            width: 36,
            borderRadius: 50,
            resizeMode: 'cover',
          }}
        />
        <View>
          <Text style={{ color: 'white' }}>From: {displaySubstring(from)}</Text>
          <Text>Hash:{displaySubstring(transaction.txID)}</Text>
          <Text style={{ color: 'white' }}>To:{to}</Text>
          <Text style={{ color: 'white' }}>Amount: {amount}</Text>
        </View>
      </View>
    </View>
  );
};

export default AllTransactions;
