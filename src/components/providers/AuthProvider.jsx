import React, { createContext, useEffect, useState } from 'react';
import './loading.css'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';
export const AuthContext = createContext(null)
const auth= getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, SetUser] = useState(null)
    const [loading,setLoading]=useState(true)
    const createUser = (email, password) => {
        setLoading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = () => {
        return signOut(auth)
    }

    // observe user auth state 
    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, currentUser => {
          SetUser(currentUser)
          setLoading(false)
      })
        //stop obesrving while unmounting
        return () => {
            return unsubscribe()
        }
    },[])
    const authInfo = {
        user,
        createUser,
        signIn,
        logOut,
        loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;