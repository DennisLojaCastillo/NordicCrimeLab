import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForumsScreen from '../screens/ForumsScreen/ForumsScreen';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}/>
        </Stack.Navigator>
    );
}

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home-outline';
                        } else if (route.name === 'Forums') {
                            iconName = 'grid';
                        } else if (route.name === 'CreatePost') {
                            iconName = 'plus-circle-outline';
                        } else if (route.name === 'Chats') {
                            iconName = 'message-outline';
                        } else if (route.name === 'Profile') {
                            iconName = 'account-outline';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#FF4500', // Rød-orange farve
                    tabBarInactiveTintColor: '#aaa',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Forums" component={ForumsScreen} />
                <Tab.Screen name="CreatePost" component={CreatePostScreen} />
                <Tab.Screen name="Chats" component={ChatScreen} />
                <Tab.Screen name="Profile" component={ProfileStack} />                
            </Tab.Navigator>
        </NavigationContainer>
    );
}
