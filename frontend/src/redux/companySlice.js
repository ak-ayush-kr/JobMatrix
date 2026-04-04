import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: { companies: [] },
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
  },
});

export const { addCompany } = companySlice.actions;
export default companySlice.reducer;