import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// 🔥 CREATE COMPANY API
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/company/registerCompany",
        companyData
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },

  // ✅ ADD THIS
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ EXPORT THIS
export const { setCompanies } = companySlice.actions;

export default companySlice.reducer;