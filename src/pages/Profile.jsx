import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebaseUtils';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
  Stack,
  Center,
  Flex,
  Spacer,
  Avatar,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import { handleLogout } from '../heplerfunctions/Logout';
import { UserContext } from '../App';

const Profile = () => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState('');
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);
  const toast = useToast();
  const user=useContext(UserContext);

  const handleUpdateDisplayName = async () => {
    try {
      await updateProfile(user, { displayName: newDisplayName });
      setIsEditingDisplayName(false);
      toast({
        title: 'Display name updated successfully.',
        status: 'success',
        duration: 2000, // Auto-close after 2 seconds
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating display name:', error);
      toast({
        title: 'An error occurred while updating the display name.',
        status: 'error',
        duration: 2000, // Auto-close after 2 seconds
        isClosable: true,
      });
    }
  };

  const handleCancelEditing = () => {
    setNewDisplayName('');
    setIsEditingDisplayName(false);
  };

  const displayNameSection = isEditingDisplayName ? (
    <VStack spacing={4} align="flex-start">
      <Input
        type="text"
        placeholder="New Display Name"
        value={newDisplayName}
        onChange={(e) => setNewDisplayName(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleUpdateDisplayName}>
        Save
      </Button>
      <Button colorScheme="gray" onClick={handleCancelEditing}>
        Cancel
      </Button>
    </VStack>
  ) : (
    <VStack spacing={4} align="flex-start">
      <Text fontSize="xl">Display Name: {user.displayName}</Text>
      <Button
        colorScheme="teal"
        size="sm"
        onClick={() => setIsEditingDisplayName(true)}
      >
        Edit Display Name
      </Button>
    </VStack>
  );


  return (
    <Box p={4} width="100vw">
      <Navbar currentView="Profile" />
      <Flex direction="column" align="center">
        <Stack p={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          align="center"
        >
          <Avatar name={user.displayName || 'User'}  size="2xl"  src={user?.photoURL} />
          <Box w="100%">{displayNameSection}</Box>
        </Stack>
        <Button
          colorScheme="red"
          onClick={()=>handleLogout(auth,navigate,toast)}
          mt={4}
          size="lg"
          w="fit-content"
        >
          Sign Out
        </Button>
      </Flex>
    </Box>
  );
};

export default Profile;
