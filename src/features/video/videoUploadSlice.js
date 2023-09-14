import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploading: false,
  uploadProgress: 0,
  error: null,
  videoUrl: null,
};

const videoUploadSlice = createSlice({
  name: 'videoUpload',
  initialState,
  reducers: {
    startUpload: (state) => {
      state.uploading = true;
      state.uploadProgress = 0;
      state.error = null;
      state.videoUrl = null;
    },
    uploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
    uploadSuccess: (state, action) => {
      state.uploading = false;
      state.uploadProgress = 100;
      state.videoUrl = action.payload;
    },
    uploadError: (state, action) => {
      state.uploading = false;
      state.uploadProgress = 0;
      state.error = action.payload;
    },
  },
});

export const { startUpload, uploadProgress, uploadSuccess, uploadError } = videoUploadSlice.actions;

export default videoUploadSlice.reducer;
