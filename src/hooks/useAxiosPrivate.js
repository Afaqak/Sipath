import { axiosPrivate } from '@/utils';
import { useEffect } from 'react';

import { signOut, useSession } from 'next-auth/react';
import axios from '../../src/utils/index';

const isTokenValid = async (token) => {
  try {
    const response = await axios.get('/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    if (response.status === 200 && response.data.isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

const useAxiosPrivate = () => {
  const { data: user } = useSession();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers['Authorization']) {
          const isValidToken = await isTokenValid(user?.token);
          console.log(isTokenValid, 'valid');
          if (isValidToken) {
            config.headers['Authorization'] = `Bearer ${user?.token}`;
          } else {
            signOut();
          }
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user]);

  return axiosPrivate;
};

export default useAxiosPrivate;
