import { createSlice } from "@reduxjs/toolkit";

const recruiterJobSlice = createSlice({
  name: "recruiterJobs",
  initialState: { jobs: [] },
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});

export const { addJob } = recruiterJobSlice.actions;
export default recruiterJobSlice.reducer;