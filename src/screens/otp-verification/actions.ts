import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../utils/helpers';
import { setLoading } from '../../redux/slices/authSlice';
import { setCurrentUser } from '../../redux/slices/appSlice';
import User from '../../models/user';
import ToastHelper from '@lamia/utils/toast-helper';

export const verifyOTP = createAsyncThunk(
  'verifyOTP',
  async (
    arg: {
      phoneNumber: string;
      password: string;
      name: string;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true));
      //   const response = await fetch('YOUR_API_ENDPOINT');
      //   const data = await response.json();

      await sleep(1000);

      dispatch(setLoading(false));

      dispatch(setCurrentUser(new User(1)));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    }
  },
);

export const resend = createAsyncThunk(
  'verifyOTP',
  async (
    arg: {
      phoneNumber: string;
      completion: () => void;
    },
    { dispatch },
  ) => {
    try {
      dispatch(setLoading(true));
      //   const response = await fetch('YOUR_API_ENDPOINT');
      //   const data = await response.json();

      await sleep(1000);

      dispatch(setLoading(false));
      arg.completion();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    }
  },
);
