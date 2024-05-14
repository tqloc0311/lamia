import Banner from '@lamia/models/banner';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BannerState {
  banners: Banner[];
}

const initialState: BannerState = {
  banners: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanners(state, action: PayloadAction<Banner[]>) {
      state.banners = action.payload;
    },
  },
});

export const { setBanners } = bannerSlice.actions;
export default bannerSlice.reducer;
