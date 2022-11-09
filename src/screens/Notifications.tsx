import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import notifee from '@notifee/react-native';

const Notifications = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    console.log('useeffect');
    return () => console.log('Clean up');
  }, [search]);

  async function onDisplayNotification() {
    await notifee.requestPermission();

    const id = await notifee
      .displayNotification({
        title: 'Foreground Service Notification',
        body: 'Press the Quick Action to stop the service',
        android: {
          channelId: '123',
          actions: [
            {
              title: 'Stopped',
              pressAction: {
                id: 'stop',
              },
            },
          ],
        },
      })
      .then(e => console.log('success', e))
      .catch(e => console.log('error', e));

    console.log('id', id);
  }

  const stoptask = () => {
    notifee.stopForegroundService('123');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Button title="Display Notification" onPress={onDisplayNotification} />
        <Button title="Stop" onPress={stoptask} />
        <TextInput
          placeholder="please search"
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

export default Notifications;
