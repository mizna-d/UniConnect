import { useUser } from '../../../Contexts/UserContext'
import Signup from '../signup';
import { useHistory } from 'react-router-dom';

const SignupRouter = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useUser()

  function signupRoute() {
    if (!currentUser) {
      return <Signup />
    }
    else {
      history.push("/timeline");
      return null
    }
  }

  return signupRoute()
}

export default SignupRouter;

