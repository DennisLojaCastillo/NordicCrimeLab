import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForumsScreen from '../screens/ForumsScreen/ForumsScreen';
import ForumDetailScreen from '../screens/ForumDetailScreen/ForumDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen/CreatePostScreen';
import PostDetailScreen from '../screens/PostDetailScreen/PostDetailScreen';
import CreateForumScreen from '../screens/CreateForumScreen/CreateForumScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import EditForumScreen from '../screens/EditForumScreen/EditForumScreen';

const Stack = createNativeStackNavigator();

export default function ForumNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="ForumsScreen"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="ForumsScreen"
                component={ForumsScreen}
            />
            <Stack.Screen
                name="ForumDetailScreen"
                component={ForumDetailScreen}
            />
            <Stack.Screen
                name="CreatePostScreen"
                component={CreatePostScreen}
            />
            <Stack.Screen
                name="PostDetailScreen"
                component={PostDetailScreen}
            />
            <Stack.Screen
                name="CreateForumScreen"
                component={CreateForumScreen}
            />
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="EditForum"
                component={EditForumScreen}
            />
        </Stack.Navigator>
    );
}
