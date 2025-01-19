import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { db, auth } from '../../config/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import styles, { colors } from './CreatePostScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreatePostScreen({ route, navigation }) {
    const { forumId } = route.params; // Hent forumId fra navigation
    const [forumData, setForumData] = useState(null); // State til forumdata
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch forumdata fra Firestore
    useEffect(() => {
        const fetchForumData = async () => {
            try {
                const forumDocRef = doc(db, 'forums', forumId);
                const forumSnap = await getDoc(forumDocRef);

                if (forumSnap.exists()) {
                    const data = forumSnap.data();
                    setForumData(data);
                    
                    // Tjek om brugeren er medlem ELLER er creator
                    const isCreator = data.createdBy === auth.currentUser.uid;
                    const isMember = data.members?.includes(auth.currentUser.uid);
                    
                    if (!isMember && !isCreator) {
                        Alert.alert('Error', 'You must be a member of this forum to create posts.');
                        navigation.goBack();
                    }
                } else {
                    Alert.alert('Error', 'Forum not found.');
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error fetching forum data:', error);
                Alert.alert('Error', 'Could not fetch forum data.');
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };

        fetchForumData();
    }, [forumId]);

    const handleCreatePost = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }
    
        try {
            const user = auth.currentUser;
    
            // Hent brugerens data fra 'users'-samlingen
            const userDocRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDocRef);
    
            if (!userSnap.exists()) {
                Alert.alert('Error', 'User data not found.');
                return;
            }
    
            const userData = userSnap.data();
    
            await addDoc(collection(db, 'posts'), {
                forumId,
                title,
                content,
                createdBy: user.uid,
                createdByName: `${userData.firstName} ${userData.lastName}`, // Brug fornavn og efternavn
                createdAt: serverTimestamp(),
            });
    
            Alert.alert('Success', 'Post created successfully!');
            navigation.goBack(); // Naviger tilbage til ForumDetailScreen
        } catch (error) {
            console.error('Error creating post:', error.message);
            Alert.alert('Error', 'Could not create post.');
        }
    };
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.darkGray} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}>
                        <Ionicons name="arrow-back-outline" size={24} color={colors.darkGray} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.contentContainer}>
                    {/* Forum Info */}
                    <Text style={styles.forumTitle}>{forumData?.title}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>{forumData?.category}</Text>
                    </View>

                    {/* Inputs */}
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter post title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.inputLabel}>Content</Text>
                    <TextInput
                        style={[styles.input, styles.contentInput]}
                        placeholder="Write your post content here..."
                        value={content}
                        onChangeText={setContent}
                        multiline
                    />

                    <TouchableOpacity 
                        style={styles.createButton} 
                        onPress={handleCreatePost}
                    >
                        <Text style={styles.createButtonText}>Create Post</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
