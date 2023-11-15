import { OnBoardingProcess } from '@/components';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import React from 'react';
import { getServerSession } from 'next-auth';

// export async function getCurrentUser() {
//   const session = await getServerSession(authOptions);
//   return session?.user;
// }
const onBoarding = async () => {

  return <OnBoardingProcess  />;
};

export default onBoarding;
