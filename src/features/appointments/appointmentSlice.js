import { createSlice } from '@reduxjs/toolkit';

import { approveAppointmentRequest,fetchAppointments, fetchReceivedAppointmentRequests, fetchSentAppointmentsRequests, rejectAppointmentRequest } from './appointmentThunk';
const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState: { appointmentRequests:[],receivedAppointmentRequests: [],sentAppointmentRequests:[], loading: false, error: null },
  reducers:{
    filterReceivedRequest(state,action){
      let requests=[...state.receivedAppointmentRequests]
     
        const filteredRequests=requests.filter(req=>req?.id!==action.payload)
        state.receivedAppointmentRequests=filteredRequests
    }
  },
  extraReducers(builder) {
    builder 
    .addCase(fetchAppointments.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(fetchAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointmentRequests = action.payload;
      state.error = null;
    })
    .addCase(fetchAppointments.rejected, (state, action) => {
      state.error = action.error;
    })
      .addCase(fetchReceivedAppointmentRequests.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchReceivedAppointmentRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.receivedAppointmentRequests = action.payload;
        state.error = null;
      })
      .addCase(fetchReceivedAppointmentRequests.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(approveAppointmentRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(approveAppointmentRequest.fulfilled, (state,action) => {
        let requests=[...state.receivedAppointmentRequests]
      
        const filteredRequests=requests.filter(req=>req?.id!==action.payload?.id)
        state.receivedAppointmentRequests=filteredRequests
        state.appointmentRequests.push(action.payload)
        state.loading = false;  
        state.error = null;
      })
      .addCase(approveAppointmentRequest.rejected, (state, action) => {
        state.error = action.error;
      }).addCase(rejectAppointmentRequest.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(rejectAppointmentRequest.fulfilled, (state,action) => {
        state.loading = false;  
        state.error = null;
      })
      .addCase(rejectAppointmentRequest.rejected, (state, action) => {
        state.error = action.error;
      }).addCase(fetchSentAppointmentsRequests.pending,(state,action)=>{
        state.loading=true
      
      }).addCase(fetchSentAppointmentsRequests.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error
      }
      ).addCase(fetchSentAppointmentsRequests.fulfilled,(state,action)=>{
        state.sentAppointmentRequests=action.payload
        state.loading=false
        state.error=null
      });
  },
});

export const {filterReceivedRequest}=appointmentSlice.actions
export default appointmentSlice.reducer;
