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
  console.log(response.data.data);
  return response.data.data;
});

// Update transaction
export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async (data) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data);
  return response.data.update;
});

// Delete transaction
export const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Upload Excel file
export const uploadExcelFile = createAsyncThunk('transaction/uploadExcelFile', async (file, { rejectWithValue }) => {
  alert('heelo ')
  try {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});




const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    status: 'idle',
    uploadStatus: 'idle', // Add uploadStatus for Excel upload
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
        const index = state.transactions.findIndex((t) => t.id.toString() === action.payload.id.toString());
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      })
      // Upload Excel file
      .addCase(uploadExcelFile.pending, (state) => {
        state.uploadStatus = 'loading';
      })
      .addCase(uploadExcelFile.fulfilled, (state) => {
        state.uploadStatus = 'succeeded';
        // Optionally, you can refetch transactions after successful upload
        state.status = 'idle'; // Reset status to refetch transactions
      })
      .addCase(uploadExcelFile.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;