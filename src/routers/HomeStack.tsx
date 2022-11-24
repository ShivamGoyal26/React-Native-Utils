import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Files
import FlatlistScreen from '../screens/FlatlistScreen';
import Main from '../screens/Main';
import LibraryPicker from '../screens/LibraryPicker';
import CamerPicker from '../screens/CamerPicker';
import LocationPicker from '../screens/LocationPicker';
import Workspace from '../screens/Workspace';
import LiveTracking from '../screens/LiveTracking';
import Notifications from '../screens/Notifications';
import StringsValidation from '../screens/StringsValidation';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Main'} component={Main} />
      <Stack.Screen name={'FlatlistScreen'} component={FlatlistScreen} />
      <Stack.Screen name={'LibraryPicker'} component={LibraryPicker} />
      <Stack.Screen name={'CamerPicker'} component={CamerPicker} />
      <Stack.Screen name={'LocationPicker'} component={LocationPicker} />
      <Stack.Screen name={'Workspace'} component={Workspace} />
      <Stack.Screen name={'LiveTracking'} component={LiveTracking} />
      <Stack.Screen name={'Notifications'} component={Notifications} />
      <Stack.Screen name={'StringsValidation'} component={StringsValidation} />
    </Stack.Navigator>
  );
};

export default HomeStack;
