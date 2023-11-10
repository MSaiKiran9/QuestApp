import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup,sendEmailVerification } from 'firebase/auth';
import { auth,googleProvider } from '../utils/firebaseUtils';
import { Flex } from '@chakra-ui/react';
import { Input, Button,Divider,Text } from '@chakra-ui/react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
  import { Spinner } from '@chakra-ui/react'

export const SignUp = ({toggleSignin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [signedUp,setSignedUp]=useState(false);
const [trackSignupButton,setTrackSignupButton]=useState(false);
const [error,setError]=useState(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = async () => {
    setTrackSignupButton(true);
    try {
      const userCerdential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredential at Signup",userCerdential);
      const sendemailverification = await sendEmailVerification(userCerdential.user);
      console.log(sendemailverification);
      setSignedUp(!signedUp);
      console.log('User signed up successfully');
      setTimeout(toggleSignin, 10000);
    } catch (error) {
      console.error('Error signing up:', error.message);
setError(error.message);
    }
    finally{
        setTrackSignupButton(false);
    }
  };
  if (signedUp){
    return <Flex direction="column"
    align="center"
    justify="center"
    h="100vh"
    w="100%"
    wrap="wrap"
    gap={3}>
        <Alert width={"50%"} status='success' variant='subtle'>
    <AlertIcon />
    Signed Up Successfully ,please verify your email in the inbox and signin . Redirecting to the Sign In page !
  </Alert>
    </Flex>
  }
  const handleGoogleSignin= async ()=>{
    try{
        const user=await signInWithPopup(auth,googleProvider);
        alert("done");
        console.log(user);
    }
    catch(error){
        console.log(error.message);
    }
  }
  return (<>
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
        Sign Up
      </Button>
      {trackSignupButton&&<Spinner/>}
      <Divider borderColor="gray.400" width="80%" mb={4} /> 
      <Button colorScheme='green' onClick={toggleSignin}>Sign In</Button>
      <Button onClick={handleGoogleSignin} colorScheme='gray'>Setup with google</Button>
    </Flex>
    </>
  );
};

