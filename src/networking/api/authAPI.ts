import { postData } from '../networkLayer';
import { Platform } from 'react-native';

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

export const login = async (phoneNumber: string, password: string) => {
  const params = {
    phone_number: phoneNumber,
    password,
    deviceToken: '',
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
