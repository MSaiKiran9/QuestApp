import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseUtils"; 
export const handleLogout = async (toast,navigate) => {
 
    try {
      await signOut(auth);
      navigate("/");
      return true;
      
    } catch (error) {
      return false;
    }
  };