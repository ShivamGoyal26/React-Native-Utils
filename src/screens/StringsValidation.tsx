import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginSchema} from '../utils/domUtils';

const StringsValidation = (props: any) => {
  const checkText = () => {
    let res = loginSchema({
      firstName: '12',
      lastName: '1234567890',
      phone: 'skg@gmail.com',
      email: 'root@gmail.com',
      url: undefined,
    });
    if (res) {
      console.log(res);
      Alert.alert('Success');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Text onPress={checkText}>Check</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default StringsValidation;
