import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import WatchVideo from '.';
import CoursePage from '.';
const WatchVideoPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <WatchVideo session={session} />;
};

export default WatchVideoPage;
