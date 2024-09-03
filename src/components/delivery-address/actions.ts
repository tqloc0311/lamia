import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setLoading } from './store';
import { setAddresses } from '@lamia/redux/slices/addressSlice';
import { IAddress } from '@lamia/models/address';

export const fetchDeliveryAddresses = createAsyncThunk(
  'delivery-address',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userAPI.getAddress();
      const data: IAddress[] = response.data;
      dispatch(setAddresses(data));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
