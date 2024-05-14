import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../utils/helpers';
import { setLoading } from '../../redux/slices/authSlice';

export const changePassword = createAsyncThunk(
  'change-password',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      await sleep(1000);

      dispatch(setLoading(false));
    } catch (error: any) {
      console.error(error);
    }
  },
);
