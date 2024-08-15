import Review from '@lamia/models/review';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ReviewState {
  reviews: Review[];
}

const initialState: ReviewState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.reviews = action.payload;
    },
  },
});

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
