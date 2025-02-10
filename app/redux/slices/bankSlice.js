import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all banks
export const fetchBanks = createAsyncThunk('banks/fetchBanks', async () => {
  const response = await axios.get('https://plkzmn5x-3011.inc1.devtunnels.ms/api/bank');
  return response.data;
});

// Add a new bank
export const addBank = createAsyncThunk('banks/addBank', async (bankData) => {
  const response = await axios.post('https://plkzmn5x-3011.inc1.devtunnels.ms/api/bank', bankData);
  return response.data;
});

// Update a bank
export const updateBank = createAsyncThunk('banks/updateBank', async ({ id, bankData }) => {
  const response = await axios.put(`https://plkzmn5x-3011.inc1.devtunnels.ms/api/bank/${id}`, bankData);
  return response.data;
});

// Delete a bank
export const deleteBank = createAsyncThunk('banks/deleteBank', async (id) => {
  await axios.delete(`https://plkzmn5x-3011.inc1.devtunnels.ms/api/bank/${id}`);
  return id;
});

const bankSlice = createSlice({
  name: 'banks',
  initialState: {
    banks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Banks
      .addCase(fetchBanks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banks = action.payload;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add Bank
      .addCase(addBank.fulfilled, (state, action) => {
        state.banks.push(action.payload);
      })
      // Update Bank
      .addCase(updateBank.fulfilled, (state, action) => {
        const index = state.banks.findIndex((bank) => bank.id === action.payload.id);
        if (index !== -1) {
          state.banks[index] = action.payload;
        }
      })
      // Delete Bank
      .addCase(deleteBank.fulfilled, (state, action) => {
        state.banks = state.banks.filter((bank) => bank.id !== action.payload);
      });
  },
});

export default bankSlice.reducer;