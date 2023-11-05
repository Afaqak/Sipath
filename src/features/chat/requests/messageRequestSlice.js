import { createSlice } from '@reduxjs/toolkit';
import { fetchMessageRequests, approveRequest, rejectRequest } from './messageRequestThunk';
const messageRequestSlice = createSlice({
  name: 'messageRequest',
  initialState: { messageRequests: [], loading: false, error: null },
  extraReducers(builder) {
    builder
      .addCase(fetchMessageRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchMessageRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.messageRequests = action.payload;
        state.error = null;
      })
      .addCase(fetchMessageRequests.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(approveRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveRequest.fulfilled, (state,action) => {
        let requests=[...state.messageRequests]
    
        const filteredRequests=requests.filter(req=>req?.id!==action.payload?.id)
     
        state.messageRequests=filteredRequests
        state.loading = false;  
        state.error = null;
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.error = action.error;
      }).addCase(rejectRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(rejectRequest.fulfilled, (state,action) => {
        let requests=[...state.messageRequests]
        const filteredRequests=requests.filter(req=>req?.id!==action.payload?.id)
        state.messageRequests=filteredRequests
        state.loading = false;  
        state.error = null;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export default messageRequestSlice.reducer;
