import { MyProfile } from '.';
import axios from '../../../utils/index';
const MyProfilePage = async ({ params }) => {
  const response = await axios.get(`/users/${params?.id}/profile`);
  console.log(response.data.user);
  return <MyProfile user={response.data?.user} />;
};

export default MyProfilePage;
