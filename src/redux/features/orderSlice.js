import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    STORE_ORDERS: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { STORE_ORDERS } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
