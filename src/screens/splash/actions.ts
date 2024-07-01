import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDidInitialize } from '../../redux/slices/appSlice';
import * as API from '@lamia/networking/api';
import { getMockBanners } from '@lamia/models/banner';
import { setBanners } from '@lamia/redux/slices/bannerSlice';

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      await Promise.all([await API.bannerAPI.fetchBanners()]);

      dispatch(setBanners(getMockBanners()));

      dispatch(setDidInitialize());
    } catch (error: any) {
      console.error(error);
    }
  },
);
