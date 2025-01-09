import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
    return (
        <NotificationProvider>
            <PaperProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </PaperProvider>
        </NotificationProvider>
    );
}
