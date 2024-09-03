import { IAddress } from '@lamia/models/address';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AddressState {
  addresses: IAddress[];
}

const initialState: AddressState = {
  addresses: [],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<IAddress[]>) {
      state.addresses = action.payload;
    },
  },
});

export const { setAddresses } = addressSlice.actions;
export default addressSlice.reducer;
