import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
