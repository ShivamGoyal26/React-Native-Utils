import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Counter = () => {
  const [count, setCount] = useState(5);
  const [changed, setChanged] = useState(false);
  const countRef: any = useRef();

  useEffect(() => {
    countRef.current = setInterval(() => {
      console.log('runing');
      setCount(pre => pre - 1);
    }, 1000);

    return () => {
      clearInterval(countRef.current);
    };
  }, [changed]);

  useEffect(() => {
    if (count <= 0) {
      clearInterval(countRef.current);
    }
  }, [count]);

  return (
    <>
      <SafeAreaView style={styles.screen}>
        <View style={styles.screen}>
          <Text>{count}</Text>

          {count <= 0 ? (
            <Text
              onPress={() => {
                setChanged(!changed);
                setCount(5);
              }}>
              Reset
            </Text>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Counter;
