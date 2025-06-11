import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import questionReducer from '../store/slices/questionSlice';
import answerReducer from '../store/slices/answerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 