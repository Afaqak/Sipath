import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentAsset: null,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    setCurrentAsset: (state, action) => {
      state.currentAsset = action.payload;
    },
    clearCurrentAsset: (state) => {
      state.currentAsset = null;
    },
  },
});

export const { setCurrentAsset, clearCurrentAsset } = assetSlice.actions;
export const selectCurrentAsset = (state) => state?.asset?.currentAsset;

export default assetSlice.reducer;
