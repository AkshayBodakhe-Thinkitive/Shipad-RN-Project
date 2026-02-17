import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
    name:'toast',
    initialState: {
        message : null,
        type: 'success',
    },
    reducers: {
        setToastMessage: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || 'success';
        },
        clearToastMessage: (state) => {
            state.message = null;
            state.type = 'success';
        },
    },
});

export const { setToastMessage, clearToastMessage } = toastSlice.actions;
export default toastSlice.reducer;