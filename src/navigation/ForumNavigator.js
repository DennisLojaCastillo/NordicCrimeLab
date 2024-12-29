import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForumsScreen from '../screens/ForumsScreen/ForumsScreen';
import ForumDetailScreen from '../screens/ForumDetailScreen/ForumDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen/PostDetailScreen';

const Stack = createNativeStackNavigator();

export default function ForumNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ForumsScreen"
                component={ForumsScreen}
                options={{ headerShown: false}} // Aktivér headers
            />
            <Stack.Screen
                name="ForumDetailScreen"
                component={ForumDetailScreen}
                options={{ headerShown: false, title: 'Forum Details' }}
            />
            <Stack.Screen
                name="CreatePostScreen"
                component={CreatePostScreen}
                options={{ headerShown: false, title: 'Create Post' }}
            />
            <Stack.Screen
                name="PostDetailScreen"
                component={PostDetailScreen}
                options={{ headerShown: false, title: 'Post Details' }}
            />
        </Stack.Navigator>

    );
}
