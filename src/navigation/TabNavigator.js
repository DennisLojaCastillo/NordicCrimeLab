import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

// Import af skærme
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForumsScreen from '../screens/ForumsScreen/ForumsScreen';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import ProfileScreenNavigator from '../navigation/ProfileScreenNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Forums') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Create') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    } else if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007BFF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Forums" component={ForumsScreen} />
            <Tab.Screen name="Create" component={CreatePostScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Profile" component={ProfileScreenNavigator} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
