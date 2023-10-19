import { createSlice } from '@reduxjs/toolkit';
import { fetchQuizzes, fetchTutorQuizzes, createQuiz, UpdateQuiz, deleteQuiz } from './quizThunk';
const quizesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: [],
    error: null,
    tutorQuizzes: [],
    loading: false,
  },
  reducers: {
    setQuizes(state, action) {
      state.quizzes = action.payload;
    },
    setTutorQuizes(state, action) {
      state.tutorQuizzes = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.unshift(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchTutorQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorQuizzes = action.payload;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.loading = false;
      })
      .addCase(UpdateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.map((quiz) =>
          quiz.id === action.payload.id ? { ...quiz, ...action.payload } : quiz
        );
        state.loading = false;
      });
  },
});

export const { setQuizes, setTutorQuizes } = quizesSlice.actions;

export default quizesSlice.reducer;
