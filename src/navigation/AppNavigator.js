import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ResearchNavigator from './ResearchNavigator';
import ForumNavigator from './ForumNavigator';
import NotificationsScreen from '../screens/NotificationsScreen/NotificationsScreen';
import ProfileScreenNavigator from './ProfileScreenNavigator';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!auth.currentUser) return;

        const q = query(
            collection(db, 'notifications'),
            where('recipientId', '==', auth.currentUser.uid),
            where('read', '==', false)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setUnreadCount(snapshot.docs.length);
        }, (error) => {
            console.error("Error fetching notifications:", error);
        });

        return () => unsubscribe();
    }, [auth.currentUser?.uid]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Research':
                            iconName = focused ? 'book' : 'book-outline';
                            break;
                        case 'Forums':
                            iconName = focused ? 'people' : 'people-outline';
                            break;
                        case 'Notifications':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Research" component={ResearchNavigator} />
            <Tab.Screen name="Forums" component={ForumNavigator} />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen}
                options={{
                    tabBarBadge: unreadCount > 0 ? unreadCount : null,
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreenNavigator} />
        </Tab.Navigator>
    );
}
