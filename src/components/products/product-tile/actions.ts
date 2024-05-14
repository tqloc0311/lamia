import * as cartSlice from '@lamia/redux/slices/cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
  'cart/add',
  async (cartItem: any, { dispatch }) => {
    try {
      dispatch(cartSlice.addToCart(cartItem));
    } catch (error: any) {
      console.error(error);
    }
  },
);
