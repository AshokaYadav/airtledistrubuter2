import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://gsr9qc3n-3012.inc1.devtunnels.ms/api";

export const getfileAsync = createAsyncThunk(
  "fetchFileData/getFile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/bank-transaction/shopuploadlog/bycollectorid/${id}`
      );
      // alert('cheking here post with get')
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch file data");
    }
  }
);



// Thunk function for file upload
export const uploadFileAsync = createAsyncThunk(
  "fileUpload/uploadFile",
  async ({ file, bankId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bankId", bankId);

      const response = await axios.post(
        "https://gsr9qc3n-3012.inc1.devtunnels.ms/api/bank-transaction/upload/data",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "File upload failed");
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    uploadedFile: null,
    successMessage: "",
    skippedTransactions: [],
    createdShopsCount: 0,
    successfulTransactionsCount: 0,
    duplicateTransactionsCount: 0,
    loading: false,
    error: null,
    data:[],
    loading1:false,
    error1:null
  },
  reducers: {
    resetUpload: (state) => {
      state.uploadedFile = null;
      state.successMessage = "";
      state.skippedTransactions = [];
      state.createdShopsCount = 0;
      state.successfulTransactionsCount = 0;
      state.duplicateTransactionsCount = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileAsync.pending, (state) => {
        state.loading = true;
        state.successMessage = "";
        state.error = null;
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFile = action.payload;
        state.successMessage = action.payload.message;
        state.skippedTransactions = action.payload.log || [];
        state.createdShopsCount = action.payload.createdShopsCount || 0;
        state.successfulTransactionsCount =
          action.payload.successfulTransactionsCount || 0;
        state.duplicateTransactionsCount =
          action.payload.duplicateTransactionsCount || 0;
      })
      .addCase(uploadFileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getfileAsync.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
      })
      .addCase(getfileAsync.fulfilled, (state, action) => {
        state.loading1 = false;
        state.fileData = action.payload.data; // Ye API ka response hoga
      })
      .addCase(getfileAsync.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpload } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
