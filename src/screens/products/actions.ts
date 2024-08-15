import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import Product from '@lamia/models/product';
import { setProducts, setLoading, setTotalProducts } from './store';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (categoryId: number, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await API.productAPI.fetchProducts([categoryId], 1, 20);
      const products: Product[] = response.data;
      const total = response.meta?.total ?? 0;

      dispatch(setProducts(products));
      dispatch(setTotalProducts(total));
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
