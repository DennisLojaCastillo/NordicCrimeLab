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
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './PostDetailScreen.styles';

export default function PostDetailScreen({ route, navigation }) {
    const { postId, postTitle, postContent } = route.params;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingComment, setEditingComment] = useState(null);

    useEffect(() => {
        const fetchComments = () => {
            const commentsQuery = query(
                collection(db, 'comments'),
                where('postId', '==', postId)
            );

            const unsubscribe = onSnapshot(commentsQuery, async (snapshot) => {
                const fetchedComments = await Promise.all(
                    snapshot.docs.map(async (docSnap) => {
                        const commentData = docSnap.data();
                        const userDocRef = doc(db, 'users', commentData.createdBy);
                        const userDocSnap = await getDoc(userDocRef);

                        const userData = userDocSnap.exists()
                            ? userDocSnap.data()
                            : { profileImage: null, firstName: 'Unknown', lastName: '' };

                        return {
                            id: docSnap.id,
                            ...commentData,
                            user: {
                                profileImage: userData.profileImage,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                            },
                        };
                    })
                );

                fetchedComments.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());
                setComments(fetchedComments);
                setLoading(false);
            });

            return unsubscribe;
        };

        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            Alert.alert('Error', 'Comment cannot be empty.');
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
                    Alert.alert('Error', 'User data not found.');
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
            }

            setNewComment('');
            setModalVisible(false);
        } catch (error) {
            console.error('Error adding/editing comment:', error.message);
            Alert.alert('Error', 'Could not add/edit comment.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteDoc(doc(db, 'comments', commentId));            
            setModalVisible(false);
        } catch (error) {
            console.error('Error deleting comment:', error.message);
            Alert.alert('Error', 'Could not delete comment.');
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
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#007BFF" />
            </TouchableOpacity>
            <Text style={styles.postTitle}>{postTitle}</Text>
            <Text style={styles.postContent}>{postContent}</Text>

            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.commentCard}>
                        <Image
                            source={{ uri: item.user.profileImage || 'https://via.placeholder.com/50' }}
                            style={styles.commentProfileImage}
                        />
                        <View style={styles.commentDetails}>
                            <Text style={styles.commentAuthor}>
                                {item.user.firstName} {item.user.lastName}
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
                )}
                ListEmptyComponent={
                    <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
                }
            />

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
                        onPress={() => {
                            handleAddComment();
                        }}
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
        </View>
    );
}
