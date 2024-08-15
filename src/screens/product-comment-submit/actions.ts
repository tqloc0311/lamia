import API from '@lamia/networking/api';
import * as reviewSubmitScreenSlice from './store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import ToastHelper from '@lamia/utils/toast-helper';
import { fetchReviews } from '@lamia/redux/actions/review';

export const postReview = createAsyncThunk(
  'review/get',
  async (
    args: {
      message: string;
      productId: number;
      rating: number;
      onFinish: () => void;
    },
    { dispatch },
  ) => {
    dispatch(reviewSubmitScreenSlice.setLoading(true));
    try {
      await API.reviewAPI.postReview(args.productId, args.rating, args.message);

      dispatch(fetchReviews(args.productId));

      args.onFinish();
    } catch (error: any) {
      ToastHelper.showError('Lỗi', error);
    } finally {
      dispatch(reviewSubmitScreenSlice.setLoading(false));
    }
  },
);
