import { IOrder } from '@lamia/models/order';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderScreenState {
  orders: IOrder[];
  loading: boolean;
}

const initialState: OrderScreenState = {
  orders: [],
  loading: false,
};

const searchScreenSlice = createSlice({
  name: 'searchScreen',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    reset(state) {
      state.orders = [];
      state.loading = false;
    },
  },
});

export const { setOrders, setLoading, reset } = searchScreenSlice.actions;
export default searchScreenSlice.reducer;
