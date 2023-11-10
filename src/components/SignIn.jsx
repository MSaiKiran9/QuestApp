import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseUtils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Input, Button,Divider,Text } from '@chakra-ui/react';
import {Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

export const SignIn = ({toggleSignin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  const signup = async () => {
    try {
      const userCred=await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      const username= userCred.user;
      console.log(username);
      setError(null);
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100%"
      wrap="wrap"
      gap={3}
    >
        <Text fontSize='6xl'>Q</Text>
      <Input width={"50%"} placeholder="Email" onChange={handleEmailChange} />
      <Input width={"50%"} type="password" placeholder="Password" onChange={handlePassChange} />
      {error && (
  <Alert width="50%" status="error" variant="subtle">
    <AlertIcon />
    {error}
  </Alert>
)}
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={signup}
      >
        Sign In
      </Button>
      <Divider borderColor="gray.400" width="80%" mb={4} /> 
      <Button colorScheme='green' onClick={toggleSignin}>Sign Up</Button>
    </Flex>
  );
  
}

