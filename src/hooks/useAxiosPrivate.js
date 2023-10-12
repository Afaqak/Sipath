import { axiosPrivate } from '@/utils';
import { signOut, useSession } from 'next-auth/react';

const useAxiosPrivate = () => {
  const { data: session } = useSession();

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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
