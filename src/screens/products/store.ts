import { OptionalProduct } from '@lamia/models/product';
import { fillArrayToFour } from '@lamia/utils/helpers';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductScreenState {
  products: OptionalProduct[];
  loading: boolean;
  totalProducts: number;
}

const initialState: ProductScreenState = {
  products: [],
  loading: false,
  totalProducts: 0,
};

const productScreenSlice = createSlice({
  name: 'productsScreen',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<OptionalProduct[]>) {
      state.products = fillArrayToFour(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
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

export const { setProducts, setLoading, reset, setTotalProducts } =
  productScreenSlice.actions;
export default productScreenSlice.reducer;
