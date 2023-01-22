import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totalOrderAmount: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    STORE_ORDERS: (state, action) => {
      state.orders = action.payload;
    },
    GET_TOTAL_ORDER_AMOUNT: (state, action) => {
      const array = [];
      state.orders.map((item) => {
        const { orderAmount } = item;
        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { STORE_ORDERS, GET_TOTAL_ORDER_AMOUNT } = orderSlice.actions;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount;
export default orderSlice.reducer;
