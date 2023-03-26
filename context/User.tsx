import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import { UserAuthProps, UserDetails } from "@/interface";
import { toast } from "react-hot-toast";

const AuthContext = createContext<UserAuthProps>({
  loginWithGoogle: () => {},
  logout: () => {},
  currentUser: null,
});

const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          toast("Logged in successfully");
          console.log(result);
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      toast("Logged out successfully");
    });
  };

  const getCurrentUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser({
        email: currentUser?.email,
        displayName: currentUser?.displayName,
        photoUrl: currentUser?.photoURL,
      });
    });
  };

  useEffect(() => {
    const subscribe = getCurrentUser();
    return () => subscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser: user, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContext };
