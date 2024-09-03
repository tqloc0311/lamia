import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PlaceOrderScreenState {
  loading: boolean;
}

const initialState: PlaceOrderScreenState = {
  loading: false,
};

const placeOrderScreenSlice = createSlice({
  name: 'placeOrderScreenScreen',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = placeOrderScreenSlice.actions;
export default placeOrderScreenSlice.reducer;
