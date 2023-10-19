import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchTutorBooks, createBook, UpdateBook, deleteBook } from './bookThunk';
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    error: null,
    tutorBooks: [],
    loading: false,
  },
  reducers: {
    setBooks(state, action) {
      state.books = action.payload;
    },
    setTutorBooks(state, action) {
      state.tutorBooks = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchTutorBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.tutorBooks = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(UpdateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBook.fulfilled, (state, action) => {
        state.books = state.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload } : book
        );
        state.loading = false;
      });
  },
});

export const { setBooks, setTutorBooks } = booksSlice.actions;

export default booksSlice.reducer;
