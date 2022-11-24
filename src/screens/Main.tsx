import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Main = (props: any) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('FlatlistScreen');
          }}>
          <Text style={{color: 'black'}}>Flalist Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('LibraryPicker');
          }}>
          <Text style={{color: 'black'}}>Library Picker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('CamerPicker');
          }}>
          <Text style={{color: 'black'}}>Camera Picker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('LocationPicker');
          }}>
          <Text style={{color: 'black'}}>Location Picker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('Workspace');
          }}>
          <Text style={{color: 'black'}}>Workspace</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('LiveTracking');
          }}>
          <Text style={{color: 'black'}}>Live Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('Notifications');
          }}>
          <Text style={{color: 'black'}}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{margin: 20}}
          onPress={() => {
            props.navigation.navigate('StringsValidation');
          }}>
          <Text style={{color: 'black'}}>Strings Validation</Text>
        </TouchableOpacity>
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

export default Main;
