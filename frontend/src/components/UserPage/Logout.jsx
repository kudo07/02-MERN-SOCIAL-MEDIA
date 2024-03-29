import { Button } from '@chakra-ui/react';

import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/userAtom';
import useShowToast from '../../hooks/useShowToast';
import { Link } from 'react-router-dom';

const Logout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      //   console.log(data, res);

      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error');
      }
      localStorage.removeItem('user-threads');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      position={'fixed'}
      top={'30px'}
      right={'30px'}
      size={'sm'}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
