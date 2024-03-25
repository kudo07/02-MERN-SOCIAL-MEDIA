import { useRecoilValue } from 'recoil';
import Signup from '../components/UserPage/Signup';
import Login from '../components/UserPage/Login';
import authScreenAtom from '../atoms/authAtom';
const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState);
  // [value,setValue] now value is "login"

  return <>{authScreenState === 'login' ? <Login /> : <Signup />}</>;
};

export default AuthPage;
