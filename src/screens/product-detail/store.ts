import { OptionalProduct } from '@lamia/models/product';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductDetailScreenState {
  product: OptionalProduct;
  loading: boolean;
}

const initialState: ProductDetailScreenState = {
  product: undefined,
  loading: false,
};

const productScreenSlice = createSlice({
  name: 'productDetailScreen',
  initialState,
  reducers: {
    setProductDetail(state, action: PayloadAction<OptionalProduct>) {
      state.product = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    reset(state) {
      state.product = undefined;
      state.loading = false;
    },
  },
});

export const { setProductDetail, setLoading, reset } =
  productScreenSlice.actions;
export default productScreenSlice.reducer;
