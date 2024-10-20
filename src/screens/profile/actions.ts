import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser } from '../../redux/slices/appSlice';
import { clearFavorites } from '@lamia/redux/slices/favoriteSlice';
import { clearNotifications } from '@lamia/redux/slices/notificationSlice';

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
  try {
    dispatch(setCurrentUser(undefined));
    dispatch(clearFavorites());
    dispatch(clearNotifications());
  } catch (error: any) {
    console.error(error);
  }
});
