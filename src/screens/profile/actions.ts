import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentUser } from '../../redux/slices/appSlice';

export const logout = createAsyncThunk('logout', async (_, { dispatch }) => {
  try {
    dispatch(setCurrentUser(undefined));
  } catch (error: any) {
    console.error(error);
  }
});
