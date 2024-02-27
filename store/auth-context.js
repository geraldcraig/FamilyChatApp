// import {createContext, useEffect, useState} from 'react';
//
// const AuthContext = createContext();
//
// export const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
//             setUser(authUser);
//         });
//         return unsubscribe;
//     }, []);
//
//     return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
// }
//
// export const useAuth = () => {
//     return useContext(AuthContext);
// };
