import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForumNavigator from './ForumNavigator';
import ResearchNavigator from './ResearchNavigator';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import ProfileScreenNavigator from './ProfileScreenNavigator';

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
                    } else if (route.name === 'Research') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Notifications') {
                        iconName = focused ? 'notifications' : 'notifications-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007BFF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Forums" component={ForumNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Research" component={ResearchNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreenNavigator} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
