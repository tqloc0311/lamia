import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import Product from '@lamia/models/product';
import { setLoading, setProductDetail } from './store';

export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId: number, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await API.productAPI.fetchProductDetail(productId);
      const product: Product = response.data;

      dispatch(setProductDetail(product));
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
