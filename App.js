import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import notifee from '@notifee/react-native';

import HomeStack from './src/routers/HomeStack';

const App = () => {
  useEffect(() => {
    createChannelId();
  }, []);

  const createChannelId = async () => {
    await notifee.createChannel({
      id: '123',
      name: 'Default Channel',
    });
  };

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
