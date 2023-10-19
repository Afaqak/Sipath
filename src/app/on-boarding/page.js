import { OnBoardingProcess } from '@/components';
import { authOptions } from '../api/auth/[...nextauth]/route';
import React from 'react';
import { getServerSession } from 'next-auth';
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  return session?.user;
}
const onBoarding = async () => {
  const getUser = await getCurrentUser();
  console.log(getUser, 'user');
  return <OnBoardingProcess />;
};

export default onBoarding;
