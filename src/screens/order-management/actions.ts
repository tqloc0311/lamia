import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import { setOrders, setLoading } from './store';
import { IOrder } from '@lamia/models/order';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await API.orderAPI.fetchOrders();
      const orders: IOrder[] = response.data;

      dispatch(setOrders(orders));
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
