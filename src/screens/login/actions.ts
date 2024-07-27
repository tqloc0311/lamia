import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../../redux/slices/authSlice';
import { setCurrentUser } from '../../redux/slices/appSlice';
import User from '../../models/user';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import TokenManager from '@lamia/networking/tokenManager';

interface LoginParams {
  phoneNumber: string;
  password: string;
}
export const login = createAsyncThunk(
  'login',
  async (params: LoginParams, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.authAPI.login(
        params.phoneNumber,
        params.password,
      );
      const token = response.token;
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
