import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../../redux/slices/authSlice';
import { setCurrentUser } from '../../redux/slices/appSlice';
import User from '../../models/user';
import ToastHelper from '@lamia/utils/toast-helper';
import API from '@lamia/networking/api';
import TokenManager from '@lamia/networking/tokenManager';

export const verifyOTP = createAsyncThunk(
  'verifyOTP',
  async (
    arg: {
      phoneNumber: string;
      password: string;
      otp: string;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true));

      const response = await API.authAPI.verifyPhoneNumber(
        arg.phoneNumber,
        arg.otp,
      );

      const error = response?.error;
      const message = response?.message;
      if (error) {
        throw { message };
      }

      const loginResponse = await API.authAPI.login(
        arg.phoneNumber,
        arg.password,
      );
      const token = loginResponse.token;
      if (!token) {
        ToastHelper.showToast(
          'Lỗi đăng nhập',
          'Access token was not found',
          'error',
        );
      }
      await TokenManager.saveToken(token);

      const userResponse = await API.userAPI.getUserInfo();
      const user: User = new User(userResponse.data);
      dispatch(setCurrentUser(user));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const resend = createAsyncThunk(
  'verifyOTP',
  async (
    arg: {
      phoneNumber: string;
      completion: (otp: string) => void;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true));
      console.log(arg.phoneNumber);

      const response = await API.authAPI.resendOTP(arg.phoneNumber);

      const error = response?.error;
      const message = response?.message;
      const data = response?.data;
      if (error) {
        throw { message };
      } else if (data) {
        const { code: otp } = data;
        arg.completion(otp);
      } else {
        throw { message: 'Lỗi không xác định (data response not found).' };
      }
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
