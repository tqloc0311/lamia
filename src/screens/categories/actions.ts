import Category from '@lamia/models/category';
import API from '@lamia/networking/api';
import {
  setChildrenCategories,
  setLoading as setCategoryLoading,
} from '@lamia/redux/slices/categorySlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setHasMoreData,
  setIsFetchingMore,
  setLoading,
  setProducts,
} from './store';
import Product, { OptionalProduct } from '@lamia/models/product';

export const fetchChildrenCategories = createAsyncThunk(
  'categories/fetchChildrenCategories',
  async (
    args: { parentId: number; page: number; showCategoryLoading: boolean },
    { dispatch, getState },
  ) => {
    const { parentId, page, showCategoryLoading } = args;
    const state: any = getState();

    const startLoading = () => {
      if (page === 1) {
        dispatch(setLoading(true));
        showCategoryLoading && dispatch(setCategoryLoading(true));
      } else {
        dispatch(setIsFetchingMore(true));
      }
    };

    const stopLoading = () => {
      dispatch(setLoading(false));
      dispatch(setCategoryLoading(false));
      dispatch(setIsFetchingMore(false));
    };

    try {
      startLoading();

      if (page === 1) {
        const [categoriesResponse, productResponse] = await Promise.all([
          API.categoryAPI.fetchChildrenCategories(parentId),
          API.productAPI.fetchProducts([parentId], page),
        ]);

        const categories = categoriesResponse.data.map(
          (json: any) => new Category(json),
        );
        dispatch(setChildrenCategories({ parentId, children: categories }));

        const products: Product[] = productResponse.data;
        dispatch(setProducts(products));
        dispatch(setHasMoreData(products.length > 0));
      } else {
        const productResponse = await API.productAPI.fetchProducts(
          [parentId],
          page,
        );
        const products: Product[] = productResponse.data;
        const previousProducts: OptionalProduct[] =
          state.categoriesScreen.products;
        dispatch(setProducts([...previousProducts, ...products]));
        dispatch(setHasMoreData(products.length > 0));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setHasMoreData(false));
    } finally {
      stopLoading();
    }
  },
);
