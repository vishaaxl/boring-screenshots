import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/firebase.config";
import { UserAuthProps, UserDetails } from "@/interface";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

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
        .then(({ user }) => {
          const docRef = doc(db, "users", user.uid);

          // save the user in db
          setDoc(docRef, {
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
            .then(() => {
              toast("Logged in successfully");
            })
            .catch(() => {
              toast.error("Couldn't save user in database!");
            });

          // after saving the user
        })
        .catch(() => {
          toast.error("Cannot authorise user!");
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
      if (currentUser) {
        setUser({
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
          uid: currentUser.uid,
        });
      } else {
        setUser(null);
      }
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
