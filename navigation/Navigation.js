import {NavigationContainer} from '@react-navigation/native';
import ScreenNavigation from "./ScreenNavigation";
import {useAuthContext} from '../hooks/useAuthContext';


// const Navigation = () => {
//     const { user, authIsReady } = useAuthContext();
//     return (
//         <NavigationContainer>
//             {!authIsReady && <ScreenNavigation />}
//             {authIsReady && !user && <SignInScreen />}
//         </NavigationContainer>
//     );
// };

const Navigation = () => {
    // const { user, isAuthenticated } = useAuthContext();
    return (
        <NavigationContainer>
            {/*{isAuthenticated && <ScreenNavigation />}*/}
            <ScreenNavigation />
        </NavigationContainer>
    );
};

export default Navigation;