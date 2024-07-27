import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import bannerSlice from './slices/bannerSlice';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  cart: cartSlice,
  banners: bannerSlice,
  categories: categorySlice,
  products: productSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
