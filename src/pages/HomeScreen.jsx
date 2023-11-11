import { Box, VStack ,Heading} from '@chakra-ui/react';
import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import CreateQuiz from '../components/CreateQuiz';
import PlayQuiz from '../components/PlayQuiz';
import { UserContext } from '../App';
const HomeScreen = () => {
  const user=useContext(UserContext);
  return (
    <>
    <Box p={4} width="100vw">
      <Navbar currentView="Home"/>
      <Heading p={4} as="h1" size="xl">
            Welcome, {user.displayName || 'User'}
          </Heading>
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
