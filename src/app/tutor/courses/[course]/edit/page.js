import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EditPage from '.';
const MyEdit = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  // const response = await axios.post('/auth/verify-token', { token: session?.token });

  return <EditPage session={session} />;
};

export default MyEdit;
