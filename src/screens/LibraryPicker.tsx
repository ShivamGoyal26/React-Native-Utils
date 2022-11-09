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
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {request, PERMISSIONS} from 'react-native-permissions';
import {openGalleryImages} from '../utils/imageManager';
import CustomActionModal from '../components/CustomActionModal';

const LibraryPicker = (props: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  const openModalHandler = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const pickImage = useCallback(async () => {
    try {
      const res: any = await openGalleryImages();
      let typeArray = res.mime.split('/');
      if (
        typeArray[typeArray.length - 1] === 'jpeg' ||
        typeArray[typeArray.length - 1] === 'png' ||
        typeArray[typeArray.length - 1] === 'jpg'
      ) {
        console.log(res);
        setImage(res);
      } else {
        Alert.alert('Type not allowed');
      }
    } catch (error: any) {
      if (
        error.message === 'User did not grant gallery permission.' ||
        error.message === 'User did not grant library permission.'
      ) {
        openModalHandler();
      }
    }
  }, [openModalHandler]);

  const checkGalleryPermissions = useCallback(() => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    )
      .then(result => {
        if (
          result === 'denied' ||
          result === 'blocked' ||
          result === 'unavailable'
        ) {
          setOpenModal(true);
        } else {
          pickImage();
        }
      })
      .catch(error => {
        console.log('This is the error', error);
      });
  }, [pickImage]);

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
          subtitle={'Please give us gallery permission in order to continue'}
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

          {image ? (
            <Image
              resizeMode="contain"
              style={{width: 200, height: 200, marginVertical: 10}}
              source={{uri: image.path}}
            />
          ) : null}
          <TouchableOpacity
            style={{margin: 20}}
            onPress={checkGalleryPermissions}>
            <Text style={{color: 'black'}}>Pick Image</Text>
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

export default LibraryPicker;
