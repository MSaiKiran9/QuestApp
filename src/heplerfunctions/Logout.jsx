import { signOut } from "firebase/auth";
export const handleLogout = async (auth,navigate,toast) => {
    try {
      await signOut(auth);
      console.log('User logged out');
      toast({
        title: 'You have been successfully logged out.',
        status: 'success',
        duration: 2000, // Auto-close after 2 seconds
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 2000, // Auto-close after 2 seconds
        isClosable: true,
      });
    }
  };