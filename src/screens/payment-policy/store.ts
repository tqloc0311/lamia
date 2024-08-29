import Page from '@lamia/models/page';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PaymentPolicyScreenState {
  data: Page | undefined;
  loading: boolean;
}

const initialState: PaymentPolicyScreenState = {
  data: undefined,
  loading: false,
};

const paymentPolicySlice = createSlice({
  name: 'paymentPolicyScreen',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Page>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    reset(state) {
      state.data = undefined;
      state.loading = false;
    },
  },
});

export const { setData, setLoading, reset } = paymentPolicySlice.actions;
export default paymentPolicySlice.reducer;
