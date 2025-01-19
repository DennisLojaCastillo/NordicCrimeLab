import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
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
    updateDoc,
    deleteDoc,
    serverTimestamp,
    orderBy,
    getDocs,
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './PostDetailScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
import { saveNotification, NOTIFICATION_TYPES } from '../../services/NotificationService';

export default function PostDetailScreen({ route, navigation }) {
    const { postId, postTitle, postContent, forumId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [users, setUsers] = useState({});
    const [isMember, setIsMember] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const checkMembershipAndLoadData = async () => {
                try {
                    // Tjek forum membership først
                    const forumRef = doc(db, 'forums', forumId);
                    const forumDoc = await getDoc(forumRef);
                    const forumData = forumDoc.data();
                    
                    // Check if user is member OR creator of the forum
                    const isUserMember = forumData.members?.includes(auth.currentUser.uid) || 
                                       forumData.createdBy === auth.currentUser.uid;
                    
                    setIsMember(isUserMember);

                    // Hvis bruger er medlem eller creator, load data
                    if (isUserMember) {
                        const commentsQuery = query(
                            collection(db, 'comments'),
                            where('postId', '==', postId),
                            orderBy('createdAt', 'asc')
                        );

                        const postRef = doc(db, 'posts', postId);
                        const postDoc = await getDoc(postRef);
                        if (postDoc.exists()) {
                            setPost(postDoc.data());
                        }

                        const unsubscribe = onSnapshot(commentsQuery, async (snapshot) => {
                            const commentsData = [];
                            const userIds = new Set();

                            snapshot.forEach(doc => {
                                const commentData = doc.data();
                                commentsData.push({ id: doc.id, ...commentData });
                                userIds.add(commentData.createdBy);
                            });

                            const usersData = {};
                            for (const userId of userIds) {
                                const userDoc = await getDoc(doc(db, 'users', userId));
                                if (userDoc.exists()) {
                                    usersData[userId] = userDoc.data();
                                }
                            }

                            setUsers(usersData);
                            setComments(commentsData);
                            setLoading(false);
                        });

                        return () => unsubscribe();
                    }
                    
                    setLoading(false);
                } catch (error) {
                    console.error('Error checking membership:', error);
                    setLoading(false);
                }
            };

            checkMembershipAndLoadData();
        }, [postId, forumId])
    );

    // Membership alert
    useEffect(() => {
        if (!isMember && !loading) {
            Alert.alert(
                'Forum Membership Required',
                'You need to join this forum to view its posts. Please join the forum first.',
                [
                    {
                        text: 'Go Back',
                        onPress: () => navigation.navigate('Forums', {
                            screen: 'ForumDetailScreen',
                            params: { forumId: forumId }
                        }),
                        style: 'cancel',
                    }
                ]
            );
        }
    }, [isMember, loading]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            const userData = userDoc.data();

            const commentRef = await addDoc(collection(db, 'comments'), {
                postId: postId,
                content: newComment.trim(),
                createdBy: auth.currentUser.uid,
                createdAt: serverTimestamp(),
                edited: false
            });

            // Hent forum medlemmer og send notifications
            const forumRef = doc(db, 'forums', forumId);
            const forumDoc = await getDoc(forumRef);
            const forumData = forumDoc.data();
            
            // Send notifications til alle forum medlemmer (undtagen en selv)
            const membersToNotify = [...(forumData.members || []), forumData.createdBy]
                .filter(memberId => 
                    memberId !== auth.currentUser.uid && 
                    memberId !== post.createdBy
                );

            for (const memberId of membersToNotify) {
                await saveNotification(
                    memberId,
                    NOTIFICATION_TYPES.COMMENT,
                    {
                        postId: postId,
                        forumId: forumId,
                        postTitle: post.title || postTitle,
                        senderName: `${userData.firstName} ${userData.lastName}`
                    }
                );
            }

            // Separat notification til post ejeren (hvis det ikke er en selv)
            if (post.createdBy !== auth.currentUser.uid) {
                await saveNotification(
                    post.createdBy,
                    NOTIFICATION_TYPES.COMMENT,
                    {
                        postId: postId,
                        forumId: forumId,
                        postTitle: post.title || postTitle,
                        senderName: `${userData.firstName} ${userData.lastName}`
                    }
                );
            }

            setNewComment('');
            if (editingComment) {
                setEditingComment(null);
                setModalVisible(false);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            Alert.alert('Error', 'Could not add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteDoc(doc(db, 'comments', commentId));
            
            const postRef = doc(db, 'posts', postId);
            await updateDoc(postRef, {
                commentCount: Math.max((post.commentCount || 0) - 1, 0)
            });

            if (editingComment && editingComment.id === commentId) {
                closeModal();
            }
        } catch (error) {
            console.error('Fejl ved sletning af kommentar:', error.message);
            Alert.alert('Fejl', 'Kunne ikke slette kommentaren.');
        }
    };

    const openEditModal = (comment) => {
        setEditingComment(comment);
        setNewComment(comment.content);
        setModalVisible(true);
    };

    const closeModal = () => {
        setEditingComment(null);
        setNewComment('');
        setModalVisible(false);
    };

    if (!isMember) {
        return null;
    }

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => {
                            if (route.params?.fromNotification) {
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                        { 
                                            name: 'Forums',
                                            state: {
                                                routes: [
                                                    { name: 'ForumsScreen' }
                                                ]
                                            }
                                        }
                                    ],
                                });
                            } else {
                                navigation.goBack();
                            }
                        }} 
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                    </TouchableOpacity>
                    
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {postTitle}
                    </Text>
                </View>

                <FlatList
                    style={styles.commentSection}
                    data={comments}
                    ListHeaderComponent={() => (
                        <View style={styles.contentContainer}>
                            <Text style={styles.postContent}>{postContent}</Text>
                            <View style={styles.separator} />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => {
                        const userData = users[item.createdBy] || {};
                        return (
                            <View style={styles.commentCard}>
                                <Image
                                    source={{ 
                                        uri: userData.profileImage || 'https://via.placeholder.com/50'
                                    }}
                                    style={styles.commentProfileImage}
                                />
                                <View style={styles.commentDetails}>
                                    <Text style={styles.commentAuthor}>
                                        {userData.firstName} {userData.lastName}
                                        {item.edited && <Text style={styles.editedText}> (edited)</Text>}
                                    </Text>
                                    <Text style={styles.commentContent}>{item.content}</Text>
                                </View>
                                {item.createdBy === auth.currentUser.uid && (
                                    <TouchableOpacity
                                        onPress={() => openEditModal(item)}
                                        style={styles.optionsButton}
                                    >
                                        <Ionicons name="ellipsis-horizontal" size={20} color="#555" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }}
                    ListEmptyComponent={
                        <Text style={styles.noCommentsText}>
                            No comments yet. Be the first to comment!
                        </Text>
                    }
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
                >
                    <View style={styles.addCommentContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                            multiline={true}
                            maxHeight={100}
                            blurOnSubmit={true}
                            onSubmitEditing={Keyboard.dismiss}
                            keyboardType="default"
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity 
                            onPress={() => {
                                handleAddComment();
                                Keyboard.dismiss();
                            }} 
                            style={styles.addCommentButton}
                        >
                            <Ionicons name="send" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>

            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <TextInput
                        style={styles.modalInput}
                        placeholder="Edit your comment..."
                        value={newComment}
                        multiline
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity
                        onPress={handleAddComment}
                        style={styles.modalButton}
                    >
                        <Text style={styles.modalButtonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleDeleteComment(editingComment.id)}
                        style={[styles.modalButton, styles.deleteButton]}
                    >
                        <Text style={styles.modalButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
