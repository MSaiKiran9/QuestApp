import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Spacer,
  Button,
  useDisclosure,
  IconButton,
  Avatar
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = ({currentView ,photoURL,displayName}) => {
  const { isOpen, onToggle } = useDisclosure();
console.log(photoURL)
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingX={4} // Horizontal padding
      paddingY={4} // Vertical padding
      bgColor="teal.500"
      color="white"
      borderBottom="2px solid white" // Add a bottom border
    >
      <Box>
        <Text fontSize="2rem" fontWeight="bold">
          {currentView}
        </Text>
      </Box>
      <Avatar name={displayName || 'User'}  size="2xl"  src={photoURL} />
      <IconButton

        display={{ base: 'block', md: 'none' }}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        onClick={onToggle}
        fontSize="xl" // Adjust icon size
      />
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex align="center" justify="center" direction="row" spacing={6}>
            <Box padding={4} fontSize={"1.5rem"} backgroundColor={'lightblue'}><Link to="/home" fontSize="lg">
            Home
          </Link></Box>
          <Box padding={4} fontSize={"1.5rem"} backgroundColor={'lightblue'}>
          <Link to="/profile" fontSize="lg">
            Profile
          </Link>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
