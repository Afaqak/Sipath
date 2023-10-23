import React from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewQuiz from '.';

const MyQuizPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.isTutor) {
    redirect('/sign-in');
  }

  return <NewQuiz session={session} />;
};

export default MyQuizPage;
