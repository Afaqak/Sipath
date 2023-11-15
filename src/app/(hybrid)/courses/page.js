import React from 'react';
import CoursesPage, { MyProfile } from '.';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  return <CoursesPage session={session} />;
};

export default MyProfilePage;
