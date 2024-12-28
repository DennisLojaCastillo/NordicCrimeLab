import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: true, // Aktiver header
                    headerTitleAlign: 'center', // Justér titlen
                    headerStyle: { backgroundColor: '#f8f8f8' },
                    headerTintColor: '#007BFF', // Farven på pilen
                    headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
                }}
            >
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create account' }} />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
