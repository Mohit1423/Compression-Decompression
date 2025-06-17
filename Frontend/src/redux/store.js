import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice.js';
import historyReducer from './history.slice.js';
export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer
  },
});