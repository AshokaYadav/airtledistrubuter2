import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice1';
import bankReducer from './slices/bankSlice';
import masterReducer from './slices/masterSlice'
import transactionReducer from  './slices/transactionSlice'
import collectorReducer from './slices/collectorSlice'
import shopReducer from './slices/shopSlice'
import shopReducer1 from './slices/shopSlice1'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    banks: bankReducer,
    master: masterReducer,
    transaction:transactionReducer,
    collector:collectorReducer,
    shop:shopReducer,
    shop1:shopReducer1
  },
});