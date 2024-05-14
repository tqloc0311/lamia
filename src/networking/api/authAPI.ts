import { postData } from '../networkLayer';

export const register = async (
  phoneNumber: string,
  password: string,
  name: string,
) => {
  return Promise.resolve({ status: 1 });
};

export const verifyPhoneNumber = async (phoneNumber: string, otp: string) => {
  return Promise.resolve({ status: 1 });
};

export const login = async (phoneNumber: string, password: string) => {
  return Promise.resolve({ status: 1 });
};
