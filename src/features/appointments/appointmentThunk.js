import { createAsyncThunk } from '@reduxjs/toolkit';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { filterReceivedRequest } from './appointmentSlice';


export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async ({token}) => {
 
    const privateAxios=useAxiosPrivate()

    try {
      const response = await privateAxios.get(`/chats/appointments`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
   
      return response.data?.appointments;
    } catch (err) {
      throw err;
    }
  }
);


export const fetchReceivedAppointmentRequests = createAsyncThunk(
  'appointments/fetchReceivedAppointmentRequests',
  async ({token}) => {
 
    const privateAxios=useAxiosPrivate()
    
    try {
      const response = await privateAxios.get(`/chats/appointments/requests`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
   
      return response.data?.appointmentRequests;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchSentAppointmentsRequests = createAsyncThunk(
  'appointments/fetchSentAppointmentRequests',
  async ({token}) => {
    const privateAxios=useAxiosPrivate()

    try {
      const response = await privateAxios.get(`/chats/appointments/sent`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
     
      return response.data.appointmentRequests;
    } catch (err) {
      throw err;
    }
  }
);




export const approveAppointmentRequest= createAsyncThunk(
  'appointments/approveAppointmentRequest',
  async ({id,token }, { dispatch }) => {
    const privateAxios=useAxiosPrivate()

    try {
      const response = await privateAxios.patch(`/chats/appointments/${id}`,{
        decision: "accept",
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

  
    
      // dispatch(fetchMessageRequests({}));
      return response.data.appointment;
    } catch (err) {
      throw err;
    }
  }
);


export const rejectAppointmentRequest = createAsyncThunk(
  'appointments/rejectAppointmentRequest',
  async ({id,token },{dispatch}) => {
    const privateAxios=useAxiosPrivate()
  
    try {
      const response = await privateAxios.patch(`/chats/appointments/${id}`,{
        decision: "deny",
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if (response.status===200){
        dispatch(filterReceivedRequest(id))
        return
      }

      
      return
   
    } catch (err) {
      throw err;
    }
  }
);
