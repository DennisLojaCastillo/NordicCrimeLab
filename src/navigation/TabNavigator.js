import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForumNavigator from './ForumNavigator';
import ResearchNavigator from './ResearchNavigator';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import ProfileScreenNavigator from './ProfileScreenNavigator';
import { useNotifications } from '../context/NotificationContext';

// Genbruger farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
    error: '#ff4444',       // Rød til notifikationer
    primary: '#000',        // Sort som primær farve
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const { unreadCount } = useNotifications();

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
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.iconGray,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopColor: colors.lightGray,
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Forums" 
                component={ForumNavigator} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Research" 
                component={ResearchNavigator} 
                options={{ headerShown: false }} 
            />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{ 
                    headerShown: false,
                    tabBarBadge: unreadCount > 0 ? unreadCount : null,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.error,
                        minWidth: 16,
                        minHeight: 16,
                        borderRadius: 8,
                        fontSize: 10,
                    }
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreenNavigator} 
                options={{ headerShown: false }} 
            />
        </Tab.Navigator>
    );
}
