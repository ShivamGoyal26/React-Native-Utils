import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Button, Alert, Platform, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {request, PERMISSIONS} from 'react-native-permissions';
import CustomActionModal from '../components/CustomActionModal';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Polyline} from 'react-native-maps';

const LiveTracking = (props: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [routes, setRoutes] = useState([]);

  const openModalHandler = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  useEffect(() => {
    console.log('><S>S>', routes, routes.length);
  }, [routes]);

  const settingLocation = useCallback(
    (coords: any) => {
      let routers = [...routes];
      console.log('BEfore Push', routers);
      routers.push({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      console.log('LOCATION', routers);
      setRoutes(() => routers);
    },
    [routes],
  );

  const pickLocation = useCallback(async () => {
    Geolocation.watchPosition(
      position => {
        settingLocation(position.coords);
      },
      error => {
        // See error code charts below.
        console.log('>>> Result from Location Lib', error.code, error.message);
        if (error.code === 2) {
          Alert.alert('Location provider not available');
        }
      },
      {enableHighAccuracy: true, fastestInterval: 5000, distanceFilter: 1},
    );
  }, [settingLocation]);

  useEffect(() => {
    checkLocationPermission();
    return () => {
      console.log('Exit the appp');
    };
  }, []);

  const checkLocationPermission = useCallback(() => {
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
          pickLocation();
        }
      })
      .catch(error => {
        console.log('This is the error', error);
      });
  }, [pickLocation]);

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
          <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            style={{flex: 1}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Polyline coordinates={routes} strokeWidth={5} />
          </MapView>
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

export default LiveTracking;
