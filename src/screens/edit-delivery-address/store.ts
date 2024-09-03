import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EditDeliveryAddressScreenState {
  loading: boolean;
  cityLoading: boolean;
  districtLoading: boolean;
}

const initialState: EditDeliveryAddressScreenState = {
  loading: false,
  cityLoading: false,
  districtLoading: false,
};

const editDeliveryAddressScreenSlice = createSlice({
  name: 'editDeliveryAddressScreenScreen',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCityLoading(state, action: PayloadAction<boolean>) {
      state.cityLoading = action.payload;
    },
    setDistrictLoading(state, action: PayloadAction<boolean>) {
      state.districtLoading = action.payload;
    },
  },
});

export const { setLoading, setCityLoading, setDistrictLoading } =
  editDeliveryAddressScreenSlice.actions;
export default editDeliveryAddressScreenSlice.reducer;
