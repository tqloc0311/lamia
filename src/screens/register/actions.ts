import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../utils/helpers';
import { setLoading } from '../../redux/slices/authSlice';
import { AppNavigationType } from '@lamia/navigation/types';
import ToastHelper from '@lamia/utils/toast-helper';

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
      //   const response = await fetch('YOUR_API_ENDPOINT');
      //   const data = await response.json();

      await sleep(1000);

      dispatch(setLoading(false));

      const params: Omit<typeof arg, 'navigation'> = { ...arg };
      arg.navigation.replace('OTPVerification', params);
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    }
  },
);
