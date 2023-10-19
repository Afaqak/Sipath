import React from 'react';
import { MyProfile } from '.';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import axios from '../../utils/index';
import { redirect } from 'next/navigation';

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const response = await axios.post('/auth/verify-token', { token: session?.token });

  return <MyProfile session={session} />;
};

export default MyProfilePage;
