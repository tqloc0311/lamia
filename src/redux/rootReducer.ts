import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import bannerSlice from './slices/bannerSlice';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  cart: cartSlice,
  banners: bannerSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
