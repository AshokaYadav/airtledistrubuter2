import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://plkzmn5x-3011.inc1.devtunnels.ms/api/bank-transaction';

// Fetch transactions
export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add transaction
export const addTransaction = createAsyncThunk('transaction/addTransaction', async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
});

// Update transaction
export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async (data) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data);
  return response.data;
});

// Delete transaction
export const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;