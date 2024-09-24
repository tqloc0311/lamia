import { OptionalProduct } from '@lamia/models/product';
import { fillArrayToFour } from '@lamia/utils/helpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SearchScreenState {
  products: OptionalProduct[];
  loading: boolean;
  isFetchingMore: boolean;
  hasMoreData: boolean;
  totalProducts: number;
}

const initialState: SearchScreenState = {
  products: [],
  loading: false,
  isFetchingMore: false,
  hasMoreData: false,
  totalProducts: 0,
};

const searchScreenSlice = createSlice({
  name: 'searchScreen',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<OptionalProduct[]>) {
      state.products = fillArrayToFour(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setIsFetchingMore(state, action: PayloadAction<boolean>) {
      state.isFetchingMore = action.payload;
    },
    setHasMoreData(state, action: PayloadAction<boolean>) {
      state.hasMoreData = action.payload;
    },
    setTotalProducts(state, action: PayloadAction<number>) {
      state.totalProducts = action.payload;
    },
    reset(state) {
      state.products = [];
      state.loading = false;
    },
  },
});

export const {
  setProducts,
  setLoading,
  reset,
  setTotalProducts,
  setHasMoreData,
  setIsFetchingMore,
} = searchScreenSlice.actions;
export default searchScreenSlice.reducer;
