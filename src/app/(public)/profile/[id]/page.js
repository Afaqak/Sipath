import { getServerSession } from 'next-auth';
import { MyProfile } from '.';
import axios from '@/utils/index'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
const MyProfilePage = async ({ params }) => {

  async function fetchUserProfile() {
    try {
      const response = await axios.get(`/users/${params?.id}/profile`);
      return response?.data
    } catch (err) {
      console.log(err)
    }
  }

  const session = await getServerSession(authOptions);
  const userData=await fetchUserProfile()
  return <MyProfile user={userData} session={session} />;
};

export default MyProfilePage;
