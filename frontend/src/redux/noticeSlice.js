import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  noticifications: [],
};

const noticeSlice = createSlice({
    name: 'noticifications',
    initialState,
    reducers: {
        setNotices: (state, action) => {
            state.noticifications = action.payload;
        },
        addNotice: (state, action) => {
            state.noticifications.push(action.payload);
        }
    }
});

export const { setNotices, addNotice } = noticeSlice.actions;
export default noticeSlice.reducer;