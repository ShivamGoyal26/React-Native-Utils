import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {request, PERMISSIONS} from 'react-native-permissions';
import CustomActionModal from '../components/CustomActionModal';
import Geolocation from 'react-native-geolocation-service';

const LocationPicker = (props: any) => {
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const oneTimePickLocation = useCallback(async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        Alert.alert(JSON.stringify(position));
      },
      error => {
        // See error code charts below.
        console.log('>>> Result from Location Lib', error.code, error.message);
        if (error.code === 2) {
          Alert.alert('Location provider not available');
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const checkGalleryPermissions = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    )
      .then(result => {
        console.log('<<< Result from Permission library', result);
        if (
          result === 'denied' ||
          result === 'blocked' ||
          result === 'unavailable'
        ) {
          setOpenModal(true);
        } else {
          oneTimePickLocation();
        }
      })
      .catch(error => {
        console.log('This is the error', error);
      });
  }, [oneTimePickLocation]);

  return (
    <>
      {openModal ? (
        <CustomActionModal
          secondbuttonaction={() => {
            openModalHandler();
            Linking.openSettings();
          }}
          firstbuttonaction={openModalHandler}
          pressHandler={openModalHandler}
          firstbuttontitle={'okay'}
          secondbuttontitle={'Open settings'}
          title={'Permission denied'}
          subtitle={'Please give us permission in order to continue'}
        />
      ) : null}
      <SafeAreaView style={styles.screen}>
        <View style={styles.screen}>
          <Button
            title="Back"
            onPress={() => {
              props.navigation.goBack();
            }}
          />

          <TouchableOpacity
            style={{margin: 20}}
            onPress={checkGalleryPermissions}>
            <Text style={{color: 'black'}}>Pick Location</Text>
          </TouchableOpacity>
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

export default LocationPicker;
