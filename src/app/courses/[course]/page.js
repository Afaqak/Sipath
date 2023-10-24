import React from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import PlaylistVideo from '.';
import { redirect } from 'next/navigation';

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <PlaylistVideo session={session} />;
};

export default MyProfilePage;
