import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bankReducer from './slices/bankSlice';
import masterReducer from './slices/masterSlice'
import transactionReducer from  './slices/transactionSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    banks: bankReducer,
    master: masterReducer,
    transaction:transactionReducer
  },
});