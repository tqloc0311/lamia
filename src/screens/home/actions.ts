import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDidInitialize } from '../../redux/slices/appSlice';
import { sleep } from '../../utils/helpers';
import { dummyAPI } from '../../networking/api';

export const test = createAsyncThunk('home/test', async (_, { dispatch }) => {
  try {
    const response = await dummyAPI.todo();
    console.log(JSON.stringify(response));
  } catch (error: any) {
    console.error(error);
  }
});
