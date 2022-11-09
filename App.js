import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import HomeStack from './src/routers/HomeStack';

const App = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
