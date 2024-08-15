import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ReviewState {
  loading: boolean;
}

const initialState: ReviewState = {
  loading: false,
};

const reviewSubmitScreenSlice = createSlice({
  name: 'review-submit',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = reviewSubmitScreenSlice.actions;
export default reviewSubmitScreenSlice.reducer;
