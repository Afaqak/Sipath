import { OnBoardingProcess } from '@/components';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import React from 'react';
import { getServerSession } from 'next-auth';


const onBoarding = async () => {

  return <OnBoardingProcess  />;
};

export default onBoarding;
