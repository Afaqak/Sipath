'use server';
import { cookies } from 'next/headers';
import axios from '../utils/index';
export default async function myCookie() {
  const token = cookies().get('jwt');
  return token;
}

export async function isTokenValid(token) {
  const auth = cookies().get('jwt')?.value;
  console.log(auth, 'auth', 'from actions');
  try {
    const response = await axios.get('/auth/verify-token', {
      headers: {
        Cookie: cookies().toString(),
      },
    });
    console.log('response', response.data);
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}
