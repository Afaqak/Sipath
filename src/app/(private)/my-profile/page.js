import React from 'react';
import { MyProfile } from '.';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <MyProfile session={session} />;
};

export default MyProfilePage;
