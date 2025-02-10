import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bankReducer from './slices/bankSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    banks: bankReducer,
  },
});