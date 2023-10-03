import axios from '../utils/index';
import { useSelector } from 'react-redux';
import { setToken } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { data: user } = useSession();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh-token', {
      withCredentials: true,
    });
    console.log(response?.data);
    const data = response.data;
    console.log(data, data.token);
    // dispatch(setToken(data?.accessToken));
    if (user) {
      user.token = data?.accessToken;
    }
    return data?.accessToken;
  };
  return refresh;
};
