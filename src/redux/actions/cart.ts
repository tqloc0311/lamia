import { CartItem } from '@lamia/models/cart-item';
import * as cartSlice from '@lamia/redux/slices/cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addToCart = createAsyncThunk(
  'cart/add',
  async (cartItem: CartItem, { dispatch }) => {
    try {
      dispatch(cartSlice.addToCart(cartItem));
    } catch (error: any) {
      console.error(error);
    }
  },
);
