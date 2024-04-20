import { createContext, useEffect, useReducer } from "react";
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext(null);

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: action.payload };
    case 'SIGN_OUT':
      return { ...state, user: null };
    case 'IS_AUTHENTICATED':
      return { user: action.payload, isAuthenticated: true };
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch({ type: 'IS_AUTHENTICATED', payload: user })
      unsubscribe()
    });
  }, []);

  console.log('AuthContextProvider state:', state);

  return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
  );
}


