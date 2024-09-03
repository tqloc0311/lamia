import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  loading: boolean;
}

const initialState: State = {
  loading: false,
};

const deliveryAddressSlice = createSlice({
  name: 'deliveryAddressScreen',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = deliveryAddressSlice.actions;
export default deliveryAddressSlice.reducer;
