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
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './PostDetailScreen.styles';
import { useFocusEffect } from '@react-navigation/native';

export default function PostDetailScreen({ route, navigation }) {
    const { postId, postTitle, postContent } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingComment, setEditingComment] = useState(null);
    const [users, setUsers] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            // Lyt til ændringer i post-dokumentet
            const postRef = doc(db, 'posts', postId);
            const unsubscribePost = onSnapshot(postRef, (doc) => {
                if (doc.exists()) {
                    setPost({ id: doc.id, ...doc.data() });
                }
            });

            // Lyt til ændringer i kommentarer
            const commentsQuery = query(
                collection(db, 'comments'),
                where('postId', '==', postId),
                orderBy('createdAt', 'asc')
            );

            const unsubscribeComments = onSnapshot(commentsQuery, async (snapshot) => {
                const commentsData = [];
                const userIds = new Set();

                snapshot.forEach((doc) => {
                    const commentData = { id: doc.id, ...doc.data() };
                    commentsData.push(commentData);
                    userIds.add(commentData.createdBy);
                });

                // Hent brugerdata for alle unikke bruger-IDs
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

            // Cleanup når komponenten unmountes
            return () => {
                unsubscribePost();
                unsubscribeComments();
            };
        }, [postId])
    );

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Fejl', 'Kommentaren må ikke være tom.');
            return;
        }

        try {
            if (editingComment) {
                await updateDoc(doc(db, 'comments', editingComment.id), {
                    content: newComment,
                    edited: true,
                    updatedAt: serverTimestamp(),
                });
                setEditingComment(null);
            } else {
                const user = auth.currentUser;
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    Alert.alert('Fejl', 'Brugerdata blev ikke fundet.');
                    return;
                }

                const userData = userDocSnap.data();

                await addDoc(collection(db, 'comments'), {
                    postId,
                    content: newComment,
                    createdBy: user.uid,
                    createdByName: `${userData.firstName} ${userData.lastName}`,
                    createdAt: serverTimestamp(),
                    edited: false,
                });

                const postRef = doc(db, 'posts', postId);
                await updateDoc(postRef, {
                    commentCount: (post.commentCount || 0) + 1
                });
            }

            setNewComment('');
            setModalVisible(false);
        } catch (error) {
            console.error('Fejl ved tilføjelse/redigering af kommentar:', error.message);
            Alert.alert('Fejl', 'Kunne ikke tilføje/redigere kommentar.');
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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.postTitle}>{postTitle}</Text>
                    <Text style={styles.postContent}>{postContent}</Text>
                    <View style={styles.separator} />
                </View>

                <FlatList
                    style={styles.commentSection}
                    data={comments}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 90 }}
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

                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment..."
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
