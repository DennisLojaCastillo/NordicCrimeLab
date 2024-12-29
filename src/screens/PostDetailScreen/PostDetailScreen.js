import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { db, auth } from '../../config/firebase';
import {
    doc,
    collection,
    query,
    where,
    onSnapshot,
    getDoc,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';


import styles from './PostDetailScreen.styles';

export default function PostDetailScreen({ route, navigation }) {
    const { postId, postTitle, postContent } = route.params; // Hent post-id og data
    const [comments, setComments] = useState([]); // State til kommentarer
    const [newComment, setNewComment] = useState(''); // State til ny kommentar
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchComments = () => {
            const commentsQuery = query(
                collection(db, 'comments'),
                where('postId', '==', postId)
            );

            const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
                const fetchedComments = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(fetchedComments);
                setLoading(false);
            });

            return unsubscribe; // Fjern lytter ved unmount
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Error', 'Comment cannot be empty.');
            return;
        }
    
        try {
            const user = auth.currentUser;
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);
    
            if (!userDocSnap.exists()) {
                Alert.alert('Error', 'User data not found.');
                return;
            }
    
            const userData = userDocSnap.data();
    
            await addDoc(collection(db, 'comments'), {
                postId,
                content: newComment,
                createdBy: user.uid,
                createdByName: `${userData.firstName} ${userData.lastName}`, // Brug fornavn og efternavn
                createdAt: serverTimestamp(),
            });
    
            setNewComment(''); // Nulstil inputfelt
        } catch (error) {
            console.error('Error adding comment:', error.message);
            Alert.alert('Error', 'Could not add comment.');
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
            {/* Post Info */}
            <Text style={styles.postTitle}>{postTitle}</Text>
            <Text style={styles.postContent}>{postContent}</Text>

            {/* Kommentarer */}
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Text style={styles.commentAuthor}>{item.createdByName}</Text>
                        <Text style={styles.commentContent}>{item.content}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.noCommentsText}>
                        No comments yet. Be the first to comment!
                    </Text>
                }
            />

            {/* Tilføj Kommentar */}
            <View style={styles.addCommentContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity
                    style={styles.addCommentButton}
                    onPress={handleAddComment}>
                    <Text style={styles.addCommentButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
