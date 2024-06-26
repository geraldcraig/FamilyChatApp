import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import CalendarEvent from "./screens/CalendarEvent";
import CalendarModalScreen from "./screens/CalendarModalScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ChatListScreen from "./screens/ChatListScreen";
import ChatScreen from "./screens/ChatScreen";
import ContactListScreen from "./screens/ContactListScreen";
import GalleryScreen from "./screens/GalleryScreen";
import GroupsScreen from "./screens/GroupsScreen";
import NewChatScreen from "./screens/NewChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Chats">
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          ),
          headerRight: () => (
            <Ionicons
              onPress={() => navigation.navigate('Contacts')}
              name="create-outline"
              size={24}
              color="black"
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Group>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
          <Stack.Screen
            name="Home"
            component={TabNavigation}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
          // options={{
          //     headerBackTitle: "Chats"
          // }}
          />
          <Stack.Screen
            name="Contacts"
            component={ContactListScreen}
          // options={{
          //     headerBackTitle: "Chats"
          // }}
          />
          <Stack.Screen
            name="NewChatScreen"
            component={NewChatScreen}
          // options={{
          //     headerBackTitle: "Chats"
          // }}
          />
            <Stack.Screen
                name="CalendarEvent"
                component={CalendarEvent}
                // options={{
                //     headerBackTitle: "Chats"
                // }}
            />
        </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="CalendarModal" component={CalendarModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
