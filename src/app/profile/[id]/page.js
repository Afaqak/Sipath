import { getServerSession } from 'next-auth';
import { MyProfile } from '.';
import axios from '../../../utils/index';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const MyProfilePage = async ({ params }) => {
  const session = await getServerSession(authOptions);
  const response = await axios.get(`/users/${params?.id}/profile`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
  });
  console.log(response.data.user);
  return <MyProfile user={response.data} session={session} />;
};

export default MyProfilePage;
