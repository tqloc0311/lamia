import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setData, setLoading } from './store';
import Page from '@lamia/models/page';

export const fetchData = createAsyncThunk(
  'page',
  async (path: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.pageAPI.fetchPage(path);
      const data: Page = new Page(response.data);
      dispatch(setData(data));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
