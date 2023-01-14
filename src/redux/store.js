import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import cartSlice from './features/cartSlice';
import checkoutSlice from './features/checkoutSlice';
import filterSlice from './features/filterSlice';
import orderSlice from './features/orderSlice';
import productSlice from './features/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  filter: filterSlice,
  cart: cartSlice,
  checkout: checkoutSlice,
  order: orderSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
