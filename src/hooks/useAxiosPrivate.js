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
        errorToast('Your session has expired. You have been logged out.');
        // signOut({ callbackUrl: '/' });
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxiosPrivate;
