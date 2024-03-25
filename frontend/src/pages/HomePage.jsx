import { Button, Flex, Box, Spinner } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Posts from '../components/PostPage/Posts';

const HomePage = () => {
  const user = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/posts/feed');
        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast('Error', error, 'error');
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);
  return (
    <Flex gap="10" alignItems={'flex-start'}>
      <Box flex={70}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}
        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}
        {posts.map((post) => (
          <Posts key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>
      <Box></Box>
    </Flex>
  );
};

export default HomePage;
