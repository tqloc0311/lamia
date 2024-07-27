import Category from '@lamia/models/category';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CategoryState {
  categories: Category[];
  childrenCategories: Record<number, Category[]>;
  promotionCategories: Category[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  childrenCategories: [],
  promotionCategories: [],
  loading: true,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setChildrenCategories(
      state,
      action: PayloadAction<{ parentId: number; children: Category[] }>,
    ) {
      state.childrenCategories[action.payload.parentId] =
        action.payload.children;
    },
    setPromotionCategories(state, action: PayloadAction<Category[]>) {
      state.promotionCategories = action.payload;
    },
  },
});

export const {
  setCategories,
  setPromotionCategories,
  setLoading,
  setChildrenCategories,
} = categorySlice.actions;
export default categorySlice.reducer;
