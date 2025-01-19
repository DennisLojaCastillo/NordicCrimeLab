import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
    SafeAreaView,
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
import { useFocusEffect } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ForumDetailScreen.styles';
import Modal from 'react-native-modal';
import { NOTIFICATION_TYPES } from '../../services/NotificationService';
import { saveNotification } from '../../services/NotificationService';
import { colors } from './ForumDetailScreen.styles';

export default function ForumDetailScreen({ route, navigation }) {
    const { forumId } = route.params;
    const [forumData, setForumData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEdit = () => {
        toggleModal();
        navigation.navigate('EditForum', { 
            forumId: forumId,
            forum: forumData
        });
    };

    const handleDelete = () => {
        toggleModal();
        Alert.alert(
            'Delete Forum',
            'Are you sure you want to delete this forum? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: deleteForum
                }
            ]
        );
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchForumData = async () => {
                try {
                    const forumRef = doc(db, 'forums', forumId);
                    const forumSnap = await getDoc(forumRef);
                    if (forumSnap.exists()) {
                        const data = forumSnap.data();
                        setForumData(data);
                        setIsMember(
                            (data.members || []).includes(auth.currentUser.uid) || 
                            data.createdBy === auth.currentUser.uid
                        );
                    }
                } catch (error) {
                    console.error('Error fetching forum data:', error);
                } finally {
                    setLoading(false);
                }
            };

            const postsQuery = query(
                collection(db, 'posts'),
                where('forumId', '==', forumId)
            );

            const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
                const postsData = [];
                snapshot.forEach((doc) => {
                    postsData.push({ id: doc.id, ...doc.data() });
                });
                setPosts(postsData);
            });

            fetchForumData();

            return () => unsubscribePosts();
        }, [forumId])
    );

    const toggleJoinLeaveForum = async () => {
        try {
            const forumRef = doc(db, 'forums', forumId);
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            const userData = userDoc.data();

            if (!isMember) {
                // Join forum
                await updateDoc(forumRef, {
                    members: arrayUnion(auth.currentUser.uid)
                });
                setIsMember(true);

                // Send notification til forum ejeren med read: false
                if (forumData.createdBy !== auth.currentUser.uid) {
                    await saveNotification(
                        forumData.createdBy,
                        NOTIFICATION_TYPES.FORUM_JOIN,
                        {
                            forumId: forumId,
                            forumTitle: forumData.title,
                            joiningUserName: `${userData.firstName} ${userData.lastName}`
                        },
                        false  // Explicit read: false
                    );
                }
            } else {
                // Leave forum
                await updateDoc(forumRef, {
                    members: arrayRemove(auth.currentUser.uid)
                });
                setIsMember(false);
            }
        } catch (error) {
            console.error('Error toggling forum membership:', error);
            Alert.alert('Error', 'Could not update forum membership');
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
    

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.darkGray} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back-outline" size={24} color={colors.darkGray} />
                    </TouchableOpacity>

                    {forumData?.createdBy === auth.currentUser.uid ? (
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons name="ellipsis-vertical" size={24} color={colors.darkGray} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={toggleJoinLeaveForum} style={styles.joinContainer}>
                            <Ionicons
                                name={isMember ? "checkmark-circle" : "add-circle"}
                                size={24}
                                color={isMember ? colors.darkGray : colors.textGray}
                            />
                            <Text style={styles.joinText}>
                                {isMember ? 'Joined' : 'Join Forum'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{forumData?.title}</Text>
                    <Text style={styles.description}>{forumData?.description}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{forumData?.category}</Text>
                    </View>
                </View>

                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PostDetailScreen', {
                                postId: item.id,
                                postTitle: item.title,
                                postContent: item.content,
                                forumId: forumId
                            })}
                            style={styles.postCard}
                        >
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postUser}>By {item.createdByName}</Text>
                            <View style={styles.postMetaContainer}>
                                <View style={styles.postStatsContainer}>
                                    <Ionicons name="chatbubble-outline" size={16} color="#666" />
                                    <Text style={styles.postStatText}>
                                        {item.commentCount || 0} comments
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyState}>
                            No posts yet. Start the conversation by creating the first post!
                        </Text>
                    }
                />

                {isMember && (
                    <TouchableOpacity
                        style={styles.createPostButton}
                        onPress={() => navigation.navigate('CreatePostScreen', { forumId })}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </TouchableOpacity>
                )}

                {/* Options Modal */}
                <Modal
                    isVisible={isModalVisible}
                    onBackdropPress={toggleModal}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalItem}
                            onPress={handleEdit}
                        >
                            <Text style={styles.modalText}>Edit Forum</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalItem, styles.deleteItem]}
                            onPress={handleDelete}
                        >
                            <Text style={[styles.modalText, styles.deleteText]}>Delete Forum</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
