import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
