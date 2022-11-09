import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Workspace = (props: any) => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  const add = useCallback(() => {
    setCount(pre => pre + 1);
  }, []);

  useEffect(() => {
    console.log('Creating');
  }, [add]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Button
          title="Back"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <Text style={{color: 'black', margin: 20}}>{count}</Text>
        <TouchableOpacity style={{margin: 20}} onPress={add}>
          <Text style={{color: 'black'}}>ADD</Text>
        </TouchableOpacity>

        <TextInput
          placeholder="enter value"
          placeholderTextColor={'grey'}
          value={search}
          onChangeText={setSearch}
        />
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

export default Workspace;
