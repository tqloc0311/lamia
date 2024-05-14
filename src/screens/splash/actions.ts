import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDidInitialize } from '../../redux/slices/appSlice';
import { sleep } from '../../utils/helpers';
import * as API from '@lamia/networking/api';
import Banner, { getMockBanners } from '@lamia/models/banner';
import { setBanners } from '@lamia/redux/slices/bannerSlice';

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    try {
      const results = await Promise.all([await API.bannerAPI.fetchBanners()]);

      dispatch(setBanners(getMockBanners()));

      dispatch(setDidInitialize());
    } catch (error: any) {
      console.error(error);
    }
  },
);
