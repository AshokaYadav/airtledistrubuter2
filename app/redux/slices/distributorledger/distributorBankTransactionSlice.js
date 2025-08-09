import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchMasterData } from "../masterSlice";

const API_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/bank/get-transactions";

const DELETE_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/edit-transactions/bankTransaction_delete "

// ✅ Fetch Transactions by Distributor ID
export const fetchDistributorBankTransactions = createAsyncThunk(
  "distributorBankTransaction/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log(response.data);
      return response.data; // ✅ API response से transactions return कर रहा है
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch transactions!");
    }
  }
);


export const deleteBankTransactiondata = createAsyncThunk(
  "distributorBankTransaction/fetchById",
  async (transaction_id,{rejectWithValue}) => {

    try{
      const response = await axios.post(DELETE_URL, { primary_id:transaction_id.id,source:transaction_id.source,id:transaction_id.id });
      console.log("Deleted transaction:", response.data);
      console.log(response);
      return;
      return { id: transaction_id };
    }catch(err){
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete transaction!"
      );
    }
  })



const distributorBankTransactionSlice = createSlice({
  name: "distributorBankTransaction",
  initialState: {
    transactions: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorBankTransactions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDistributorBankTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;

      })
      .addCase(fetchDistributorBankTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default distributorBankTransactionSlice.reducer;
