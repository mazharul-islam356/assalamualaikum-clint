
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "./firebase";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [userr,setUser] = useState()
    const [loading,setLoading]= useState(true)

    // google login
    const googleLogin = () => {
        setLoading(true)
       return signInWithPopup(auth,googleProvider)
    }


    // REuser
    const REuser = (email,pass) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,pass)
    }

    // signOut
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }
    

    // onAuthStateChanged
    useEffect(()=>{
        onAuthStateChanged(auth,currentUser=>{
            console.log('observing current user', currentUser);
            setUser(currentUser)
            setLoading(false)
            
        })
    },[])



    const authintication = {
        userr,
        googleLogin,
        REuser,
        logOut,
        loading
    }


    return (
        <AuthContext.Provider value={authintication}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;