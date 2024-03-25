import { useEffect, useState } from 'react';
import UserHeader from '../components/UserPage/UserHeader';
import UserPost from '../components/UserPage/UserPost';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
const UserPage = () => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setUser(data);
      } catch (error) {
        showToast('error', error, 'error');
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);
  if (!user && loading) {
    return (
      <Flex justiyContent={'center'} alignContent={'center'} ml={250} mt={50}>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user && !loading) return <h1>USER NOT FOUND</h1>;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={480}
        postImg="/post1.png"
        postTitle="This is  about my Github"
      />
      <UserPost
        likes={1200}
        replies={480}
        postImg="/post1.png"
        postTitle="This is  about my Github"
      />
      <UserPost
        likes={1200}
        replies={480}
        postImg="/post1.png"
        postTitle="This is  about my Github"
      />
      <UserPost
        likes={1200}
        replies={480}
        postImg="/post1.png"
        postTitle="This is  about my Github"
      />
    </>
  );
};

export default UserPage;
