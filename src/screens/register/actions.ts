import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../../redux/slices/authSlice';
import { AppNavigationType } from '@lamia/navigation/types';
import ToastHelper from '@lamia/utils/toast-helper';
import API from '@lamia/networking/api';

export const register = createAsyncThunk(
  'register',
  async (
    arg: {
      phoneNumber: string;
      password: string;
      name: string;
      navigation: AppNavigationType;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authAPI.register(
        arg.phoneNumber,
        arg.password,
        arg.name,
      );

      const error = response?.error;
      const message = response?.message;
      const data = response?.data;

      if (error) {
        throw { message };
      } else if (data) {
        const { phone: phoneNumber, code: otp } = data;
        const params = { ...arg, phoneNumber, otp };
        arg.navigation.replace('OTPVerification', params);
      } else {
        throw { message: 'Lỗi không xác định (data response not found).' };
      }
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
