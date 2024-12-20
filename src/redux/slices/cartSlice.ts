import { IAddress } from '@lamia/models/address';
import { CartItem } from '@lamia/models/cart-item';
import { IDiscountDetails } from '@lamia/models/coupon';
import { IShippingOption } from '@lamia/models/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: CartItem[];
  deliveryAddress: IAddress | undefined;
  shippingOptions: IShippingOption[];
  discount: IDiscountDetails | undefined;
}

const initialState: CartState = {
  cartItems: [],
  deliveryAddress: undefined,
  shippingOptions: [],
  discount: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { quantity, attribute, product } = action.payload;
      const existingItem = state.cartItems.find(item => {
        if (item.attribute) {
          return !(
            item.attribute?.id === attribute?.id &&
            item.product.id === product.id
          );
        } else {
          return item.product.id === product.id;
        }
      });
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: number; attributeId?: number }>,
    ) {
      state.cartItems = state.cartItems.filter(item => {
        if (item.attribute) {
          return !(
            item.attribute.id === action.payload.attributeId &&
            item.product.id === action.payload.productId
          );
        } else {
          return item.product.id === action.payload.productId;
        }
      });
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{
        productId: number;
        attributeId?: number;
        quantity: number;
      }>,
    ) {
      const existingItem = state.cartItems.find(item => {
        if (item.attribute) {
          return !(
            item.attribute.id === action.payload.attributeId &&
            item.product.id === action.payload.productId
          );
        } else {
          return item.product.id === action.payload.productId;
        }
      });

      if (existingItem && action.payload.quantity > 0) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    setDeliveryAddress(state, action: PayloadAction<IAddress>) {
      state.deliveryAddress = action.payload;
    },
    setShippingOptions(state, action: PayloadAction<IShippingOption[]>) {
      state.shippingOptions = action.payload;
    },
    applyDiscount(state, action: PayloadAction<IDiscountDetails>) {
      state.discount = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
      state.deliveryAddress = undefined;
      state.shippingOptions = [];
      state.discount = undefined;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  setDeliveryAddress,
  setShippingOptions,
  applyDiscount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
