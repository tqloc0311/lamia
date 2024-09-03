import Product from '@lamia/models/product';
import { AttributeDetail } from '@lamia/models/product-attribute';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  isFetchingAttributeDetail: boolean;
  attributeDetails: Record<string, AttributeDetail>;
}

const initialState: ProductState = {
  products: [],
  isFetchingAttributeDetail: false,
  attributeDetails: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setIsFetchingAttributeDetail(state, action: PayloadAction<boolean>) {
      state.isFetchingAttributeDetail = action.payload;
    },
    setAttributeDetail(
      state,
      action: PayloadAction<{
        productId: number;
        attributeId: number;
        attributeDetail: AttributeDetail;
      }>,
    ) {
      const { productId, attributeId, attributeDetail } = action.payload;
      const key = `${productId}_${attributeId}`;
      state.attributeDetails = {
        ...state.attributeDetails,
        [key]: attributeDetail,
      };
    },
  },
});

export const { setProducts, setAttributeDetail, setIsFetchingAttributeDetail } =
  productSlice.actions;
export default productSlice.reducer;
