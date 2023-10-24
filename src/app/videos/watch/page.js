import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import WatchVideo from '.';

const WatchVideoPage = async () => {
  const session = await getServerSession(authOptions);
  return <WatchVideo session={session} />;
};

export default WatchVideoPage;
