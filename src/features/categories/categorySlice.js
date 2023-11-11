import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    { category: "Physics", id: 1 },
    { category: "Chemistry", id: 2 },
    { category: "Mathematics", id: 3 },
    { category: "Psychology", id: 4 },
    { category: "Coding", id: 5 },
    { category: "Art", id: 6 },
    { category: "Biology", id: 7 },
    { category: "History", id: 8 },
    { category: "English", id: 9 },
    { category: "Literature", id: 10 },
  ],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const selectCategories = (state) => state.categories.categories;

export default categorySlice.reducer;
