import ImagePicker from 'react-native-image-crop-picker';

export const openGalleryImages = async () => {
  try {
    const res = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      cropperStatusBarColor: '#000000',
    });
    if (res) {
      return res;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const openCameraImages = async () => {
  try {
    const res = await ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      cropperStatusBarColor: '#000000',
    });
    if (res) {
      return res;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
