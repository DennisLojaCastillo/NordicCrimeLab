import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { db, auth } from '../../config/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import styles from './CreatePostScreen.styles';
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
                    setForumData(forumSnap.data());
                } else {
                    Alert.alert('Error', 'Forum not found.');
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error fetching forum data:', error.message);
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
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
            </TouchableOpacity>
            {/* Forum Info */}
            <Text style={styles.forumTitle}>{forumData?.title}</Text>
            <Text style={styles.forumCategory}>Category: {forumData?.category}</Text>

            {/* Inputs */}
            <TextInput
                style={styles.input}
                placeholder="Post Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.contentInput]}
                placeholder="Post Content"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
                <Text style={styles.createButtonText}>Create Post</Text>
            </TouchableOpacity>
        </View>
    );
}
