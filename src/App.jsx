import React, { useEffect, useState, lazy, Suspense, createContext } from "react";
import "./App.css";
import { Auth } from "./pages/Auth";
import { auth } from "./utils/firebaseUtils";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoadingPage from "./components/Loading";

const Profile = lazy(() => import('./pages/Profile'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));

// prop drilling avoidance.
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onAuthStateChangedHandler(authUser) {
    console.log("authUser object is", authUser);
    if (authUser) {
      if (authUser?.emailVerified) {
        setUser(authUser);
      } else {
        await signOut(auth);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return () => {
      unsubscribe();
      console.log("unsubscribed");
    };
  }, []);

  function GenericWrapper({ children }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <UserContext.Provider value={user}>
          {children}
        </UserContext.Provider>
      </Suspense>
    );
  }

  console.log(user?.displayName); // Add a null check here

  const getHomeElement = () => {
    if (loading) {
      return <LoadingPage />;
    } else if (user?.displayName) {
      return <GenericWrapper children={<HomeScreen />} />;
    } else {
      return <GenericWrapper children={<Profile />} />;
    }
  };
  
  const router = createBrowserRouter(
    user ? [
      { path: '/', element: getHomeElement() },
      { path: '/home', element: <GenericWrapper children={<HomeScreen />} /> },
      { path: '/profile', element: <GenericWrapper children={<Profile />} /> }
    ] : [
      { path: '/', element: loading ? <LoadingPage /> : <Auth /> }
    ]
  );
  

  return (
    <>
  <ChakraProvider>
    {loading ? (
      <LoadingPage />
    ) : (
      <RouterProvider router={router} />
    )}
  </ChakraProvider>
    </>
  );
}

export default App;