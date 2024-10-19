import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser } from '../../redux/slices/appSlice';
import { clearFavorites } from '@lamia/redux/slices/favoriteSlice';

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
  try {
    dispatch(setCurrentUser(undefined));
    dispatch(clearFavorites());
  } catch (error: any) {
    console.error(error);
  }
});
