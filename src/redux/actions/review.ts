import API from '@lamia/networking/api';
import * as reviewSlice from '@lamia/redux/slices/reviewSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReviews = createAsyncThunk(
  'review/get',
  async (productId: number, { dispatch }) => {
    try {
      const response = await API.reviewAPI.fetchReviews(productId);
      dispatch(reviewSlice.setReviews(response.reviews || []));
    } catch (error: any) {
      console.error(error);
    }
  },
);
