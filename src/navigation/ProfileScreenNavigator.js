import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileScreenNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UserProfile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditUserProfile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
