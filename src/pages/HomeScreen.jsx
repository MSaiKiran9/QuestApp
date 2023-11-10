import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Navbar';
import CreateQuiz from '../components/CreateQuiz';
import PlayQuiz from '../components/PlayQuiz';
const HomeScreen = ({user}) => {
  return (
    <>
    <Box p={4} width="100vw">
      <Navbar currentView="Home" displayName={user.displayName} photoURL={user.photoURL}/>
      <h1>Welcome back, {user.displayName}</h1>
      <VStack>
<Box>
<CreateQuiz/>
<PlayQuiz/>
</Box>
      </VStack>
      </Box>
    </>
  );
};

export default HomeScreen;
