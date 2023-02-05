import { useUser } from './../../../Contexts/UserContext'
import Login from '../login';
import { useHistory } from 'react-router-dom';

const LoginRouter = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useUser()

  function loginRoute() {
    if (!currentUser) {
      return <Login />
    }
    else {
      history.push("/timeline");
      return null
    }
  }

  return loginRoute()
}

export default LoginRouter;

