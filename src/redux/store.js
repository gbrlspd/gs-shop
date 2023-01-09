import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import filterSlice from './features/filterSlice';
import productSlice from './features/productSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  filter: filterSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
