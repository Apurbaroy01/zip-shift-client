import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from '../../Firebase/Firebase';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const updatauser = (UpateProfile) => {
        return updateProfile(auth.currentUser, UpateProfile)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User:", user || "NO User")
            setUser(user)
            setLoading(false)
        });
        return unsubscribe;
    }, [])

    const AuthInfo = {
        createUser,
        signIn,
        signWithGoogle,
        updatauser,
        logOut,
        user,
        loading,
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;