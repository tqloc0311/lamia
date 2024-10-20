import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@lamia/networking/api';
import {
  setLoading,
  setNotifications,
  setNotificationRead as setNotificationReadState,
} from '@lamia/redux/slices/notificationSlice';
import { Notification } from '@lamia/models/notification';

export const fetchNotifications = createAsyncThunk(
  'fetchNotifications',
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await API.userAPI.getNotifications();
      const notification: Notification[] = response.data;
      dispatch(setNotifications(notification));
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const setNotificationRead = createAsyncThunk(
  'setNotificationRead',
  async (id: number, { dispatch }) => {
    try {
      await API.userAPI.setNotificationRead(id);
      dispatch(setNotificationReadState(id));
    } catch (error: any) {
      console.error(error);
    }
  },
);
