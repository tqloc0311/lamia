import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setLoading } from '@lamia/redux/slices/favoriteSlice';
import { fetchFavorite } from '@lamia/hooks/use-refresh-session';

export const addFavorite = createAsyncThunk(
  'addFavorite',
  async (productId: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userAPI.addFavorite(productId);
      const message = response.message || 'Thêm sản phẩm thành công';
      await fetchFavorite(dispatch);
      ToastHelper.showSuccess('Thành công', message);
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'removeFavorite',
  async (id: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.userAPI.deleteFavorite(id);
      const message = response.message || 'Xóa sản phẩm thành công';
      await fetchFavorite(dispatch);
      ToastHelper.showSuccess('Thành công', message);
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
