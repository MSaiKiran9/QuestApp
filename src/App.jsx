import React, { useEffect, useState,lazy,Suspense } from "react";
import "./App.css";
import { Auth } from "./pages/Auth";
import { auth } from "./utils/firebaseUtils";
import { ChakraProvider } from "@chakra-ui/react";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import LoadingPage from "./components/Loading";

const Profile = React.lazy(() => import('./pages/Profile'));
const HomeScreen = React.lazy(() => import('./pages/HomeScreen'));

function App() {
  const [user, setUser] = useState(null);
const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log("authUser object is", authUser);
      if (authUser) {
        if (authUser?.emailVerified) {
          alert("User email is verified. Welcome onboard!");
          setUser(authUser);
        } else {
          alert("User is signed in, but email is not verified. Please verify your email.");
          setUser(null);
        }
      } else {
        console.log("User is signed out.");
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  console.log("user", user);

  const router = createBrowserRouter(
    user ? [
      {
        path: '/',
        element: loading?<LoadingPage/>:user.displayName?<Suspense fallback={<div>Loading...</div>}><HomeScreen user={user}/></Suspense>:<Suspense fallback={<div>Loading...</div>}><Profile user={user} /></Suspense>
      },
      {
        path: '/home',
        element: <Suspense fallback={<div>Loading...</div>}><HomeScreen user={user}/></Suspense>
      },
      {
        path: '/profile',
        element: <Suspense fallback={<div>Loading...</div>}><Profile user={user} /></Suspense>
      }
   ] : [{
      path: '/',
      element: loading?<LoadingPage/>:<Auth />
    }]
  );

  return (
    <>
      <ChakraProvider>
      <RouterProvider router={router} /> 
      </ChakraProvider>
    </>
  );
}

export default App;
