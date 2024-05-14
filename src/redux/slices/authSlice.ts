import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoading: boolean;
  didRegister: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  didRegister: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDidRegister(state) {
      state.didRegister = true;
    },
  },
});

export const { setLoading, setDidRegister } = registerSlice.actions;
export default registerSlice.reducer;
