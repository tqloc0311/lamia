import { fetchData, postData } from '../networkLayer';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const register = async (
  phoneNumber: string,
  password: string,
  name: string,
) => {
  const params = {
    phone_number: phoneNumber,
    password,
    name,
  };
  return postData('register', params);
};

export const verifyPhoneNumber = async (phoneNumber: string, otp: string) => {
  const params = {
    phone_number: phoneNumber,
    code: otp,
  };
  return postData('checkcode', params);
};

export const resendOTP = async (phoneNumber: string) => {
  const params = {
    phone_number: phoneNumber,
  };
  return fetchData('resendcode', params);
};

export const login = async (phoneNumber: string, password: string) => {
  const token = await messaging().getToken();
  const params = {
    phone_number: phoneNumber,
    password,
    deviceToken: token,
    deviceType: Platform.OS,
  };
  return postData('login', params);
};

export const refreshToken = async (oldToken: string) => {
  const params = {
    oldAccessToken: oldToken,
  };
  return postData('refresh_token', params);
};
