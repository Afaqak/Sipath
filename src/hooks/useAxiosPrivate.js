import { axiosPrivate } from '@/utils';
import { errorToast } from '@/utils/toasts';
import { signOut } from 'next-auth/react';

const useAxiosPrivate = () => {
  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 403) {
        
        // signOut({ callbackUrl: '/' });
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
