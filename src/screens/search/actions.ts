import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import Product, { OptionalProduct } from '@lamia/models/product';
import {
  setProducts,
  setLoading,
  setTotalProducts,
  setHasMoreData,
  setIsFetchingMore,
} from './store';

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (args: { query: string; page: number }, { dispatch, getState }) => {
    const { query, page } = args;

    if (page === 1) {
      dispatch(setLoading(true));
    } else {
      dispatch(setIsFetchingMore(true));
    }

    const state: any = getState();
    try {
      const response = await API.productAPI.fetchProducts([], page, 20, query);
      const products: Product[] = response.data;
      const total = response.meta?.total ?? 0;

      if (page === 1) {
        dispatch(setProducts(products));
      } else {
        const prev: OptionalProduct[] = state.productsScreen.products;
        dispatch(setProducts([...prev, ...products]));
      }
      dispatch(setHasMoreData(products.length > 0));
      dispatch(setTotalProducts(total));
    } catch (error: any) {
      console.error(error);
      dispatch(setHasMoreData(false));
    } finally {
      dispatch(setLoading(false));
      dispatch(setIsFetchingMore(false));
    }
  },
);
