// import { createContext, useState } from "react";
//
// export const AuthContext = createContext({
//     token: '',
//     isAuthenticated: false,
//     authenticate: (token) => { },
//     logout: () => { },
// });
//
//
// function AuthContextProvider({ children }) {
//     const [authToken, setAuthToken] = useState();
//
//     function authenticate(token) {
//         setAuthToken(token);
//     }
//
//     function logout() {
//         setAuthToken(null);
//     }
//
//     const value = {
//         token: authToken,
//         isAuthenticated: !!authToken,
//         authenticate: authenticate,
//         logout: logout,
//     };
//
//     // const authenticate = (token) => {
//     //     localStorage.setItem('token', token);
//     // };
//
//     // const logout = () => {
//     //     localStorage.removeItem('token');
//     // };
//
//     // const token = localStorage.getItem('token');
//     // const isAuthenticated = !!token;
//
//     return
//         // <AuthContext.Provider value={{ token, isAuthenticated, authenticate, logout }}>
//         <AuthContext.Provider value={ value }>
//             { children }
//         </AuthContext.Provider >;
//
// }
//
// export default AuthContextProvider;