import Category from '@lamia/models/category';
import API from '@lamia/networking/api';
import {
  setChildrenCategories,
  setLoading,
} from '@lamia/redux/slices/categorySlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChildrenCategories = createAsyncThunk(
  'app/initialize',
  async (parentId: number, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await API.categoryAPI.fetchChildrenCategories(parentId);
      const categories = response.data.map((json: any) => new Category(json));
      dispatch(setChildrenCategories({ parentId, children: categories }));
    } catch (error: any) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  },
);
