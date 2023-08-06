/* eslint-disable prettier/prettier */
import { FlatList, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { currencyByRupee } from './constants';
import CurrencyBtn from './components/CurrencyBtn';

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [resultVal, setResultVal] = useState('');
  const [targetCurr, setTargetCurr] = useState('');

  const btnPressed = (targetValue: Currency) => {
    if (!inputVal) {
      return (
        <View>
          <Text>Enter the amount</Text>
        </View>
      )
    }
    const inputAmt = parseFloat(inputVal);
    if (!isNaN(inputAmt)) {
      const convertedVal = inputAmt * targetValue.value;
      const result = `${targetValue.symbol} ${convertedVal.toFixed(2)}`;
      setResultVal(result);
      setTargetCurr(targetValue.name);
    } else {
      return (
        <View>
          <Text>Invalid Input</Text>
        </View>
      )
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputVal}
              clearButtonMode='always' 
              onChangeText={setInputVal}
              keyboardType='number-pad'
              placeholder='Enter amount in Rupees'
            />
          </View>
          {resultVal && (
            <Text style={styles.resultTxt} >
              {resultVal}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurr === item.name && styles.selected
                ]}
                onPress={() => btnPressed(item)}
              >
                <CurrencyBtn {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
  },
  rupee: {
    marginRight: 8,
    fontSize: 18,
    color: '#fff',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#eee',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});