import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import favoriteSlice from './slices/favoriteSlice';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import bannerSlice from './slices/bannerSlice';
import categorySlice from './slices/categorySlice';
import productSlice from './slices/productSlice';
import reviewSlice from './slices/reviewSlice';
import addressSlice from './slices/addressSlice';
import globalSlice from './slices/globalSlice';
import userSlice from './slices/userSlice';
import productScreenSlice from '@lamia/screens/products/store';
import searchScreenSlice from '@lamia/screens/search/store';
import productDetailScreenSlice from '@lamia/screens/product-detail/store';
import reviewSubmitScreenSlice from '@lamia/screens/product-comment-submit/store';
import categoriesScreenSlice from '@lamia/screens/categories/store';
import paymentPolicyScreenSlice from '@lamia/screens/payment-policy/store';
import deliveryAddressScreenSlice from '@lamia/components/delivery-address/store';
import editDeliveryAddressScreenSlice from '@lamia/screens/edit-delivery-address/store';
import placeOrderScreenSlice from '@lamia/screens/place-order/store.ts';
import orderManagementScreenSlice from '@lamia/screens/order-management/store.ts';
import pageScreenSlice from '@lamia/screens/page/store.ts';

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  cart: cartSlice,
  banners: bannerSlice,
  categories: categorySlice,
  products: productSlice,
  reviews: reviewSlice,
  addresses: addressSlice,
  global: globalSlice,
  user: userSlice,
  productsScreen: productScreenSlice,
  productDetailScreen: productDetailScreenSlice,
  reviewSubmitScreen: reviewSubmitScreenSlice,
  categoriesScreen: categoriesScreenSlice,
  paymentPolicyScreen: paymentPolicyScreenSlice,
  deliveryAddressScreen: deliveryAddressScreenSlice,
  editDeliveryAddressScreen: editDeliveryAddressScreenSlice,
  placeOrderScreen: placeOrderScreenSlice,
  searchScreen: searchScreenSlice,
  orderManagementScreen: orderManagementScreenSlice,
  pageScreen: pageScreenSlice,
  favorite: favoriteSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
