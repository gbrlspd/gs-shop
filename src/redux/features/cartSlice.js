import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQty: 0,
  cartTotalAmount: 0,
  previousURL: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (productIndex >= 0) {
        /* Item already in the cart (increase quantity) */
        state.cartItems[productIndex].cartQty += 1;
        toast.success('Item quantity increased successfully', { theme: 'colored', position: 'top-left' });
      } else {
        /* Item doesn't exist in the car (add item to the cart) */
        const tempProduct = { ...action.payload, cartQty: 1 };
        state.cartItems.push(tempProduct);
        toast.success('Item added successfully', { theme: 'colored', position: 'top-left' });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    DECREASE_FROM_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (state.cartItems[productIndex].cartQty > 1) {
        state.cartItems[productIndex].cartQty -= 1;
        toast.error('Item quantity decreased successfully', { theme: 'colored', position: 'top-left' });
      } else if (state.cartItems[productIndex].cartQty === 1) {
        const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        state.cartItems = newCartItems;
        toast.error('Item removed successfully', { theme: 'colored', position: 'top-left' });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART: (state, action) => {
      const newCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = newCartItems;
      toast.error('Item removed successfully', { theme: 'colored', position: 'top-left' });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      toast.error('Cart cleared', { theme: 'colored', position: 'top-left' });
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    GET_SUBTOTAL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQty } = item;
        const cartItemAmount = price * cartQty;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    GET_QTY: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        return array.push(item.cartQty);
      });
      const totalQty = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQty = totalQty;
    },

    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const { ADD_TO_CART, DECREASE_FROM_CART, REMOVE_FROM_CART, CLEAR_CART, GET_SUBTOTAL, GET_QTY, SAVE_URL } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQty = (state) => state.cart.cartTotalQty;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;
export default cartSlice.reducer;
