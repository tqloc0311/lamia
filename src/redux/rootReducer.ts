import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import bannerSlice from './slices/bannerSlice';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';
import reviewSlice from './slices/reviewSlice';
import productScreenSlice from '@lamia/screens/products/store';
import productDetailScreenSlice from '@lamia/screens/product-detail/store';
import reviewSubmitScreenSlice from '@lamia/screens/product-comment-submit/store';
import categoriesScreenSlice from '@lamia/screens/categories/store';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  cart: cartSlice,
  banners: bannerSlice,
  categories: categorySlice,
  products: productSlice,
  reviews: reviewSlice,
  productsScreen: productScreenSlice,
  productDetailScreen: productDetailScreenSlice,
  reviewSubmitScreen: reviewSubmitScreenSlice,
  categoriesScreen: categoriesScreenSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
