import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDidInitialize } from '../../redux/slices/appSlice';
import Banner from '@lamia/models/banner';
import { setBanners } from '@lamia/redux/slices/bannerSlice';
import API from '@lamia/networking/api';
import useRefreshSession from '@lamia/hooks/use-refresh-session';
import { DispatchType } from '@lamia/hooks/context';
import {
  setCategories,
  setPromotionCategories,
} from '@lamia/redux/slices/categorySlice';
import Category from '@lamia/models/category';

const useFetchBanners = async (dispatch: DispatchType) => {
  const response = await API.bannerAPI.fetchBanners();
  const banners = response.data.map((json: any) => new Banner(json));
  dispatch(setBanners(banners));
};

const useFetchCategories = async (dispatch: DispatchType) => {
  const response = await API.categoryAPI.fetchCategories();
  const categories = response.data.map((json: any) => new Category(json));
  dispatch(setCategories(categories));
};

const useFetchPromotionCategories = async (dispatch: DispatchType) => {
  const response = await API.categoryAPI.fetchPromotionCategories();
  const categories = response.data.map((json: any) => new Category(json));
  dispatch(setPromotionCategories(categories));
};

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      await Promise.all([
        await useFetchBanners(dispatch),
        await useFetchCategories(dispatch),
        await useFetchPromotionCategories(dispatch),
        await useRefreshSession(dispatch),
      ]);
    } catch (error: any) {
      console.error(error);
    }

    dispatch(setDidInitialize());
  },
);
