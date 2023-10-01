import axios from '../utils/index';
import { useSelector } from 'react-redux';
import { setToken } from '@/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userAuth.token);
  const refresh = async () => {
    const response = await axios.get('/auth/refresh-token', {
      withCredentials: true,
    });
    const data = response.data;
    console.log(data, token);
    dispatch(setToken(data?.accessToken));
    return data?.accessToken;
  };
  return refresh;
};
