import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import QuizSolutionPage from './page';

const ViewQuizPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <QuizSolutionPage session={session} />;
};

export default ViewQuizPage;
