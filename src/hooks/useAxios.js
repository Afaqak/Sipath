import { axiosPrivate } from '@/utils';
import { errorToast } from '@/utils/toasts';
import { signOut } from 'next-auth/react';
const useAxios = () => {
  axiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error.response.data.error)
      
      if (error.response?.data.error === 'Token has expired') {
        errorToast("Your Session has Expired....logging you out!")
        await signOut()
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivate;
};

export default useAxios;
