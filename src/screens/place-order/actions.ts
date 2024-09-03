import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import ToastHelper from '@lamia/utils/toast-helper';
import { setLoading } from './store';
import { IDiscountDetails } from '@lamia/models/coupon';
import {
  applyDiscount,
  setShippingOptions,
} from '@lamia/redux/slices/cartSlice';
import { IShippingOption } from '@lamia/models/order';
import { IAddress } from '@lamia/models/address';
import { OrderProduct } from '@lamia/models/product-attribute';

export const checkCoupon = createAsyncThunk(
  'check-coupon',
  async (code: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.orderAPI.checkCoupon(code);
      const coupon: IDiscountDetails = response.data.data;
      dispatch(applyDiscount(coupon));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const fetchShippingOptions = createAsyncThunk(
  'fetch-shipping-options',
  async (total: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await API.orderAPI.fetchShippingOptions(total);
      const data: IShippingOption[] = Object.keys(response.data).map(
        (key: string): IShippingOption => ({
          id: key,
          name: response.data[key].name || '',
          price: response.data[key].price || 0,
          default: response.data[key].default || 0,
        }),
      );
      dispatch(setShippingOptions(data));
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const makeOrder = createAsyncThunk(
  'make-order',
  async (
    args: {
      address: IAddress;
      shipping_option: string;
      shipping_method: string;
      payment_method: string;
      description: string | undefined;
      coupon_code: string | undefined;
      products: OrderProduct[];
      callback: () => void;
    },
    { dispatch },
  ) => {
    try {
      const params: Omit<typeof args, 'callback'> = { ...args };
      dispatch(setLoading(true));
      await API.orderAPI.makeOrder(params);

      args.callback();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
