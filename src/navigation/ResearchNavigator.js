import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResearchHubScreen from '../screens/ResearchHubScreen/ResearchHubScreen';
import CreateResearchScreen from '../screens/CreateResearchScreen/CreateResearchScreen';
import ResearchDetailScreen from '../screens/ResearchDetailScreen/ResearchDetailScreen';
import EditResearchScreen from '../screens/EditResearchScreen/EditResearchScreen';

const Stack = createNativeStackNavigator();

export default function ResearchNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ResearchHub" 
                component={ResearchHubScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="CreateResearch" 
                component={CreateResearchScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ResearchDetail" 
                component={ResearchDetailScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="EditResearch" 
                component={EditResearchScreen} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
} 