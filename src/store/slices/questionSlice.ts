import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Question {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  currentQuestion: null,
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestionsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsSuccess: (state, action: PayloadAction<Question[]>) => {
      state.loading = false;
      state.questions = action.payload;
    },
    fetchQuestionsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<Question>) => {
      state.currentQuestion = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.unshift(action.payload);
    },
    updateQuestion: (state, action: PayloadAction<Question>) => {
      const index = state.questions.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
      if (state.currentQuestion?.id === action.payload.id) {
        state.currentQuestion = action.payload;
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(q => q.id !== action.payload);
      if (state.currentQuestion?.id === action.payload) {
        state.currentQuestion = null;
      }
    },
  },
});

export const {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setCurrentQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = questionSlice.actions;

export default questionSlice.reducer; 