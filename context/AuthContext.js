import React, { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth';


export const AuthContext = createContext();

// const initialState = {
//     user: null
// };


const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    }); 


    // useEffect(() => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //         dispatch({ type: 'SET_USER', payload: user });
    //     });

    //     return unsubscribe;
    // }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'SET_USER', payload: user });
            unsubscribe();
        });
    }, []);

    // const updateUserProfile = (uid, firstName, lastName, email) => {
    //     const userRef = ref(firebase.database(), `users/${uid}`);
    //     set(userRef, { firstName, lastName, email });
    // };

   

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
};