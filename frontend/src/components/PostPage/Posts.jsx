import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
// import { useRecoilValue } from 'recoil';
// import userAtom from '../../atoms/userAtom';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from '@chakra-ui/image';
import Action from '../UserPage/Action';
import { useEffect, useState } from 'react';
import useShowToast from '../../hooks/useShowToast';
const Posts = ({ post, postedBy }) => {
  // {
  //   console.log('post', post);
  // }

  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  // const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  // /

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);

        const data = await res.json();
        if (data.error) {
          showToast('Error', data.error, 'error');
          return;
        }

        setUser(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);
  //
  if (!user) return null;
  return (
    <Link to={`/${user.username}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar
            size="md"
            name={user.name}
            src={user?.profilePic}
            oncClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w="1px" h={'full'} bg="gray.light" my={2}></Box>
          <Box position={'relative'} w={'full'}>
            {post.replies.length === 0 && <Text textAlign={'center'}>🥱</Text>}
            {post.replies[0] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[0].userProfilePic}
                position={'absolute'}
                top={'0px'}
                left="15px"
                padding={'2px'}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[1].userProfilePic}
                position={'absolute'}
                top={'0px'}
                left="15px"
                padding={'2px'}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size="xs"
                name="John Doe"
                src={post.replies[2].userProfilePic}
                position={'absolute'}
                top={'0px'}
                left="15px"
                padding={'2px'}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text
                fontSize={'sm'}
                fontWeight={'bold'}
                oncClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text
                fontStyle={'sm'}
                color={'gray.light'}
                width={36}
                textAlign={'right'}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={'hidden'}
              border={'2px solid'}
              borderColor={'gray.light'}
            >
              <Image src={post.img} w={'full'} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Action post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};
export default Posts;
