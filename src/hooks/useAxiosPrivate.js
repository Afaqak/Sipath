'use client';
import { axiosPrivate } from '@/utils';
import { useEffect } from 'react';
import { useRefreshToken } from './useRefreshToken';
import { useSelector } from 'react-redux';
import { setToken } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';

const useAxiosPrivate = () => {
  const user = useSelector((state) => state.userAuth);
  const refresh = useRefreshToken();
  const Dispatch = useDispatch();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.token}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          Dispatch(setToken(newAccessToken));
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log(newAccessToken, 'new access token');
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.response.eject(requestIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
