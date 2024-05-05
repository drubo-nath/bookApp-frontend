import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import React, {createContext, useEffect, useState } from 'react'
import app from '../Firebase/firebase.config'
import axios from 'axios';

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

function AuthProvider({children}) {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    // create account
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const signUpwithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // login with email and password
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        return signOut(auth)
        
    }

    // update profile
    const updateUserProfile = (name, photoURL) => {
       
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }


    // check signed in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser){
                const userInfo ={email: currentUser.email}
                axios.post('https://bookapp-backend-ylwm.onrender.com/jwt', userInfo)
                  .then( (response) => {
                    // console.log(response.data.token);
                    if(response.data.token){
                        localStorage.setItem("access-token", response.data.token)
                    }
                  })
            } else{
               localStorage.removeItem("access-token")
            }
           
            setLoading(false);
        });
              return () => {
                return unsubscribe()
        }
    }, [])
    

    const authInfo = {
        user,
        setUser,
        createUser,
        signUpwithGoogle,
        loginWithEmail,
        logout, 
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider;