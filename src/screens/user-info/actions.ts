import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading } from '../../redux/slices/authSlice';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setCurrentUser } from '@lamia/redux/slices/appSlice';

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await API.userAPI.deleteUser();
      dispatch(setCurrentUser(undefined));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
