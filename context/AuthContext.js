import { createContext, useEffect } from 'react';
import {auth, db} from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {onValue, ref} from "firebase/database";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      console.log('user:', user.email, user.uid);
      unsub();
    });
  }, []);


    return <AuthContext.Provider value={ "user" }>
      {children}
    </AuthContext.Provider>;
  }


