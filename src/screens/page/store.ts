import Page from '@lamia/models/page';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PageScreenState {
  data: Page | undefined;
  loading: boolean;
}

const initialState: PageScreenState = {
  data: undefined,
  loading: false,
};

const pageSlice = createSlice({
  name: 'pageScreen',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Page>) {
      state.data = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    reset(state) {
      state.data = undefined;
      state.loading = false;
    },
  },
});

export const { setData, setLoading, reset } = pageSlice.actions;
export default pageSlice.reducer;
