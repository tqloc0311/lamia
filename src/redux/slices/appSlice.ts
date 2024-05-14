import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import User from '../../models/user';

interface DataState {
  initialized: boolean;
  currentUser: User | undefined;
  isBottomBarTransparent: boolean;
}

const initialState: DataState = {
  initialized: false,
  currentUser: undefined,
  isBottomBarTransparent: false,
};

const dataSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDidInitialize(state) {
      state.initialized = true;
    },
    setCurrentUser(state, action: PayloadAction<User | undefined>) {
      state.currentUser = action.payload;
    },
    setBottomBarTransparent(state, action: PayloadAction<boolean>) {
      state.isBottomBarTransparent = action.payload;
    },
  },
});

export const { setDidInitialize, setCurrentUser, setBottomBarTransparent } =
  dataSlice.actions;
export default dataSlice.reducer;
