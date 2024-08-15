import { CartItem } from '@lamia/models/cart-item';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      const { product, size, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        item => item.product.id === product.id && item.size.id === size.id,
      );
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
