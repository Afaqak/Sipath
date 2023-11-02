import React from 'react';
import CoursesPage, { MyProfile } from '.';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import axios from '../../utils/index';
import { redirect } from 'next/navigation';

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return <CoursesPage session={session} />;
};

export default MyProfilePage;
