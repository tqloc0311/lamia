import { IFavorite } from '@lamia/models/favorite';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FavoriteState {
  favorites: IFavorite[];
  loading: boolean;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<IFavorite[]>) {
      state.favorites = action.payload;
    },
    addFavorite(state, action: PayloadAction<IFavorite>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload,
      );
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearFavorites(state) {
      state.favorites = [];
      state.loading = false;
    },
  },
});

export const {
  setFavorites,
  addFavorite,
  removeFavorite,
  setLoading,
  clearFavorites,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
