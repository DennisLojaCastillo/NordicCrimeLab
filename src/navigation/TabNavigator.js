import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ForumNavigator from './ForumNavigator';
import ResearchNavigator from './ResearchNavigator';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import ProfileScreenNavigator from './ProfileScreenNavigator';
import { useNotifications } from '../context/NotificationContext';

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
                tabBarActiveTintColor: '#007BFF',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen 
                name="Forums" 
                component={ForumNavigator} 
                options={{ 
                    headerShown: false,
                    tabBarPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [
                                { 
                                    name: 'Forums',
                                    state: {
                                        routes: [
                                            { name: 'ForumsScreen' }
                                        ]
                                    }
                                }
                            ],
                        });
                    }
                }} 
            />
            <Tab.Screen name="Research" component={ResearchNavigator} options={{ headerShown: false }} />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{ 
                    headerShown: false,
                    tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
                    tabBarBadgeStyle: { 
                        backgroundColor: '#FF3B30',
                        minWidth: 16,
                        minHeight: 16,
                        borderRadius: 8,
                    }
                }} 
            />
            <Tab.Screen name="Profile" component={ProfileScreenNavigator} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
