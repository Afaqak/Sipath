import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import QuizPage from '.';

const ViewQuizPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <QuizPage session={session} />;
};

export default ViewQuizPage;
