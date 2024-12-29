import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { auth, db } from '../../config/firebase';
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    query,
    where,
    onSnapshot,
    deleteDoc,
    getDocs,
    writeBatch,
} from 'firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ForumDetailScreen.styles';

export default function ForumDetailScreen({ route, navigation }) {
    const { forumId } = route.params;
    const [forumData, setForumData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForumData = async () => {
            try {
                const forumRef = doc(db, 'forums', forumId);
                const forumSnap = await getDoc(forumRef);
                if (forumSnap.exists()) {
                    const data = forumSnap.data();
                    setForumData(data);
                    setIsMember(data.members?.includes(auth.currentUser.uid));
                }
            } catch (error) {
                console.error('Error fetching forum data:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPosts = () => {
            const postsQuery = query(
                collection(db, 'posts'),
                where('forumId', '==', forumId)
            );
            const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
                const fetchedPosts = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(fetchedPosts);
            });

            return unsubscribe;
        };

        fetchForumData();
        const unsubscribePosts = fetchPosts();

        return () => {
            unsubscribePosts();
        };
    }, [forumId]);

    const toggleJoinLeaveForum = async () => {
        if (forumData?.createdBy === auth.currentUser.uid) {
            Alert.alert('Notice', 'You cannot leave a forum you created.');
            return;
        }

        try {
            const forumRef = doc(db, 'forums', forumId);
            if (isMember) {
                await updateDoc(forumRef, {
                    members: arrayRemove(auth.currentUser.uid),
                });
                setIsMember(false);
            } else {
                await updateDoc(forumRef, {
                    members: arrayUnion(auth.currentUser.uid),
                });
                setIsMember(true);
            }
        } catch (error) {
            console.error('Error updating forum membership:', error);
        }
    };

    const deleteForum = async () => {
        try {
            const forumRef = doc(db, 'forums', forumId);
            const postsQuery = query(collection(db, 'posts'), where('forumId', '==', forumId));
            const postsSnapshot = await getDocs(postsQuery);
    
            const batch = writeBatch(db);
    
            // Tilføj alle posts til batch for sletning
            postsSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
    
            // Tilføj forummet til batch for sletning
            batch.delete(forumRef);
    
            // Udfør batch-operation
            await batch.commit();
    
            Alert.alert('Success', 'Forum and all associated posts deleted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting forum:', error.message);
            Alert.alert('Error', 'Could not delete forum.');
        }
    };
    

    const confirmDelete = () => {
        Alert.alert(
            'Delete Forum',
            'Are you sure you want to delete this forum? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: deleteForum, style: 'destructive' },
            ]
        );
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
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
                </TouchableOpacity>

                {forumData?.createdBy === auth.currentUser.uid ? (
                    <TouchableOpacity
                        onPress={confirmDelete}
                        style={styles.deleteButton}
                    >
                        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.joinContainer}>
                        <TouchableOpacity onPress={toggleJoinLeaveForum}>
                            <Ionicons
                                name={
                                    isMember
                                        ? 'checkmark-circle-outline'
                                        : 'add-circle-outline'
                                }
                                size={28}
                                color={isMember ? '#007BFF' : '#888'}
                            />
                        </TouchableOpacity>
                        <Text style={styles.joinText}>
                            {isMember ? 'Leave Forum' : 'Join Forum'}
                        </Text>
                    </View>
                )}
            </View>
            <Text style={styles.title}>{forumData?.title}</Text>
            <Text style={styles.description}>{forumData?.description}</Text>
            <Text style={styles.category}>Category: {forumData?.category}</Text>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('PostDetailScreen', {
                                postId: item.id,
                                postTitle: item.title,
                                postContent: item.content,
                            })
                        }
                        style={styles.postCard}
                    >
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={styles.postUser}>By: {item.createdByName}</Text>
                        <Text style={styles.postComments}>
                            {item.comments?.length || 0} comments
                        </Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyState}>No posts yet. Be the first to post!</Text>
                }
            />


            {isMember && (
                <TouchableOpacity
                    style={styles.createPostButton}
                    onPress={() => navigation.navigate('CreatePostScreen', { forumId })}
                >
                    <Text style={styles.createPostButtonText}>Create Post</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
