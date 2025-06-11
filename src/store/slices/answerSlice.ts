import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  id: string;
  content: string;
  questionId: string;
  userId: string;
  isVerified: boolean;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
}

interface AnswerState {
  answers: Answer[];
  loading: boolean;
  error: string | null;
}

const initialState: AnswerState = {
  answers: [],
  loading: false,
  error: null,
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    fetchAnswersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnswersSuccess: (state, action: PayloadAction<Answer[]>) => {
      state.loading = false;
      state.answers = action.payload;
    },
    fetchAnswersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
    },
    updateAnswer: (state, action: PayloadAction<Answer>) => {
      const index = state.answers.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.answers[index] = action.payload;
      }
    },
    deleteAnswer: (state, action: PayloadAction<string>) => {
      state.answers = state.answers.filter(a => a.id !== action.payload);
    },
    verifyAnswer: (state, action: PayloadAction<string>) => {
      const answer = state.answers.find(a => a.id === action.payload);
      if (answer) {
        answer.isVerified = true;
      }
    },
    updateVoteCount: (state, action: PayloadAction<{ answerId: string; count: number }>) => {
      const answer = state.answers.find(a => a.id === action.payload.answerId);
      if (answer) {
        answer.voteCount = action.payload.count;
      }
    },
  },
});

export const {
  fetchAnswersStart,
  fetchAnswersSuccess,
  fetchAnswersFailure,
  addAnswer,
  updateAnswer,
  deleteAnswer,
  verifyAnswer,
  updateVoteCount,
} = answerSlice.actions;

export default answerSlice.reducer; 