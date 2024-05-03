import { createContext } from "react";
import { auth } from '../firebaseConfig';
import { getAuth } from "firebase/auth";

const { user } = getAuth();

export const UserContext = createContext();

export function UserProvider({ children }) {
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

