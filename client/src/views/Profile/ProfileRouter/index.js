import { useUser } from '../../../Contexts/UserContext';
import AdminProfile from '../AdminProfile/AdminProfile';
import UserProfile from '../UserProfile/UserProfile';
import { useHistory } from 'react-router-dom';

const ProfileRouter = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useUser()

  // check if user is authorized
  function porfileRoute() {
    if (!currentUser) {
      history.push("/");
      return null
    }
    else if (currentUser.userType) {
      return <AdminProfile />
    }
    else {
      return <UserProfile />
    }
  }

  return porfileRoute()
}

export default ProfileRouter;