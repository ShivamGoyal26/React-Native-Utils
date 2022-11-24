import {Alert, Dimensions} from 'react-native';
import {z} from 'zod';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const emailCheckRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const getScreenWidth = (value: any) => {
  if (value) {
    let finalValue = (screenWidth * value) / 100;
    return finalValue;
  } else {
    return screenWidth;
  }
};

export const getScreenHeight = (value: any) => {
  if (value) {
    let finalValue = (screenHeight * value) / 100;
    return finalValue;
  } else {
    return screenHeight;
  }
};

export const getUtcOffset = () => {
  var date = new Date();
  var utcOffsetInSecond = -date.getTimezoneOffset();
  return utcOffsetInSecond;
};

export const checkEmail = (email: any) => {
  return emailCheckRegex.test(email.trim());
};

export const checkPassword = (password: any) => {
  return password.trim().length >= 3;
};

export const getNumbersOnly = (value: any) => {
  return value.replace(/[^0-9]/g, '');
};

export const loginSchema = (obj: any) => {
  try {
    const FormData = z.object({
      firstName: z
        .string({
          required_error: 'First Name is required',
          invalid_type_error: 'First Name must be a string',
        })
        .min(1, {message: 'firstName Must be in btw 1-18 characters'})
        .max(18, {message: 'First Name must not be greater than 18'}),
      lastName: z.string().min(1).max(18),
      phone: z.string().min(10).max(14).optional(),
      email: z.string().email(),
      url: z
        .string({
          required_error: 'Url is required',
          invalid_type_error: 'url must be a string',
        })
        .url({message: 'it must be a url'})
        .optional(),
    });
    const res = FormData.parse(obj);
    return res;
  } catch (err) {
    if (err instanceof z.ZodError) {
      Alert.alert(err.issues[0].message);
    }
  }
};
