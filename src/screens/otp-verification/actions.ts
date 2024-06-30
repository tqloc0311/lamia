import { createAsyncThunk } from '@reduxjs/toolkit';
import { sleep } from '../../utils/helpers';
import { setDidRegister, setLoading } from '../../redux/slices/authSlice';
import { setCurrentUser } from '../../redux/slices/appSlice';
import User from '../../models/user';

export const register = createAsyncThunk('login', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    //   const response = await fetch('YOUR_API_ENDPOINT');
    //   const data = await response.json();

    await sleep(1000);

    dispatch(setLoading(false));

    dispatch(setCurrentUser(new User(1)));
  } catch (error: any) {
    console.error(error);
  }
});
