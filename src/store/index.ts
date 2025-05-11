
import { configureStore } from '@reduxjs/toolkit';
import generatorReducer from './slices/generatorSlice';

export const store = configureStore({
  reducer: {
    generator: generatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
