import axios from 'axios';
import { errorToast } from './toasts';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend.sipath.com',
  withCredentials: true,
});

export const axiosPrivate = axios.create({

  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend.sipath.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;


export const validateInput = (fields) => {
  const missingField = fields.find((field) => !field.value);
  if (missingField) {
    errorToast(`Please fill in the ${missingField.label} field.`);
    return false;
  }
  return true;
};

