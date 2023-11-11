import React, { useContext ,useState} from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import {Box} from '@chakra-ui/react'
const ParentContainer = () => {
    const user=useContext(UserContext);
    const  [currpage,setCurrPage]=useState('Welcome ');

  return (
    <>
    <Box p={4} width="100vw">
      <Navbar currentView={currpage} handleCurrView={setCurrPage}/>
      <Outlet/>
      </Box>
    </>
    
  )
}

export default ParentContainer