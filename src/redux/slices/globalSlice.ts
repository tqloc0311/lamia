import { ICity, IDistrict } from '@lamia/models/address';
import { IPaymentMethod } from '@lamia/models/payment-method';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  paymentMethods: IPaymentMethod[];
  cities: ICity[];
  districts: IDistrict[];
}

const initialState: GlobalState = {
  paymentMethods: [],
  cities: [],
  districts: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setPaymentMethods(state, action: PayloadAction<IPaymentMethod[]>) {
      state.paymentMethods = action.payload;
    },
    setCities(state, action: PayloadAction<ICity[]>) {
      state.cities = action.payload;
    },
    setDistricts(state, action: PayloadAction<IDistrict[]>) {
      state.districts = action.payload;
    },
  },
});

export const { setPaymentMethods, setCities, setDistricts } =
  globalSlice.actions;
export default globalSlice.reducer;
