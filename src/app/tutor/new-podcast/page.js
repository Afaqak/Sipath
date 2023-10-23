import React from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPodcast from '.';

const MyPodcastPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  return <NewPodcast session={session} />;
};

export default MyPodcastPage;
