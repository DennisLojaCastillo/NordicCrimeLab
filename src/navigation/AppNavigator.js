import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lyt efter brugerens authentication-status
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe; // Cleanup listener
    }, []);

    if (loading) {
        return null; // Vis evt. en loading-skærm
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
