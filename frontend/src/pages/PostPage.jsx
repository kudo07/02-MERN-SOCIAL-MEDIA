import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

import { BsThreeDots } from 'react-icons/bs';
import Action from '../components/UserPage/Action';
import { useState } from 'react';
import Comments from '../components/PostPage/Comments';

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src="/zuck-avatar.png" size={'md'} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>This is about my github</Text>
      <Box
        borderRadius={6}
        overflow={'hidden'}
        border={'2px solid'}
        borderColor={'gray.light'}
      >
        <Image src="/post1.png" w={'full'} />
      </Box>
      <Flex gap={3} my={3}>
        <Action liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'sm'}>
          238 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text>{200 + (liked ? 1 : 0)} likes</Text>
      </Flex>
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}>✔</Text>
          <Text color={'gray.light'}>Get the app to like , reply and post</Text>
        </Flex>
        <Button>GET</Button>
      </Flex>
      <Divider my={4} />
      <Comments
        comment="Looks really good!"
        createdAt="2d"
        likes={100}
        username="johndoe"
        useAvatar="https://bit.ly/dan-abramov"
      />
      <Comments
        comment="Looks really good!"
        createdAt="2d"
        likes={100}
        username="johndoe"
        useAvatar="https://bit.ly/dan-abramov"
      />
      <Comments
        comment="Looks really good!"
        createdAt="2d"
        likes={100}
        username="johndoe"
        useAvatar="https://bit.ly/dan-abramov"
      />
    </>
  );
};

export default PostPage;
