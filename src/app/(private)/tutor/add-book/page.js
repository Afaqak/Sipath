import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddBook from '.';
const NewBookPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in');
  }

  return <AddBook session={session} />;
};

export default NewBookPage;
