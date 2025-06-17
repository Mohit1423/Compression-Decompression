// src/redux/slices/historySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logs: [] // Each log: { name, algorithm, file (base64), compressedFile (base64) }
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryEntry: (state, action) => {
      state.logs.push(action.payload);
    },
    clearHistory: (state) => {
      state.logs = [];
    },
  }
});

export const { addHistoryEntry, clearHistory } = historySlice.actions;
export default historySlice.reducer;
