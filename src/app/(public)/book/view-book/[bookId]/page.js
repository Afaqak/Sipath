import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import BookPage from '.';

const ViewBookPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <BookPage session={session} />;
};

export default ViewBookPage;
