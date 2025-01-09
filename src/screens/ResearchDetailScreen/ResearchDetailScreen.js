import React, { useState } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator,
    Image,
    Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { db, auth } from '../../config/firebase';
import { doc, getDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove, onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';
import styles from './ResearchDetailScreen.styles';

export default function ResearchDetailScreen({ route, navigation }) {
    const { researchId } = route.params;
    const [research, setResearch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasLiked, setHasLiked] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const currentUser = auth.currentUser;

    useFocusEffect(
        React.useCallback(() => {
            // Kun lyt til ændringer i research dokumentet
            const researchRef = doc(db, 'research', researchId);
            const unsubscribeResearch = onSnapshot(researchRef, (doc) => {
                if (doc.exists()) {
                    const data = { id: doc.id, ...doc.data() };
                    setResearch(data);
                    setHasLiked(data.likedBy?.includes(currentUser.uid) || false);
                    setLoading(false);
                }
            });

            return () => unsubscribeResearch();
        }, [researchId])
    );

    const handleLike = async () => {
        try {
            const docRef = doc(db, 'research', researchId);
            if (hasLiked) {
                // Unlike
                await updateDoc(docRef, {
                    likes: research.likes - 1,
                    likedBy: arrayRemove(currentUser.uid)
                });
                setResearch(prev => ({
                    ...prev,
                    likes: prev.likes - 1
                }));
            } else {
                // Like
                await updateDoc(docRef, {
                    likes: research.likes + 1,
                    likedBy: arrayUnion(currentUser.uid)
                });
                setResearch(prev => ({
                    ...prev,
                    likes: prev.likes + 1
                }));
            }
            setHasLiked(!hasLiked);
        } catch (error) {
            console.error('Error updating like:', error);
            Alert.alert('Error', 'Failed to update like');
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEdit = () => {
        toggleModal();
        navigation.navigate('EditResearch', { 
            researchId: researchId,
            research: research
        });
    };

    const handleDelete = () => {
        toggleModal();
        Alert.alert(
            'Delete Research',
            'Are you sure you want to delete this research? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'research', researchId));
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting research:', error);
                            Alert.alert('Error', 'Failed to delete research');
                        }
                    }
                }
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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#007BFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Research Details</Text>
                    {research?.createdBy === currentUser.uid ? (
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons name="ellipsis-vertical" size={24} color="#007BFF" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={handleLike}>
                            <Ionicons 
                                name={hasLiked ? "heart" : "heart-outline"} 
                                size={24} 
                                color={hasLiked ? "#ff4444" : "#666"} 
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{research.title}</Text>
                    
                    <View style={styles.metaInfo}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryTag}>{research.category}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Abstract</Text>
                        <Text style={styles.abstractText}>{research.abstract}</Text>
                    </View>

                    {research.keywords && research.keywords.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Keywords</Text>
                            <View style={styles.keywordsContainer}>
                                {research.keywords.map((keyword, index) => (
                                    <Text key={index} style={styles.keywordTag}>
                                        {keyword}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {research.images && research.images.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Images</Text>
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                style={styles.imagesContainer}
                            >
                                {research.images.map((image, index) => (
                                    <Image 
                                        key={index}
                                        source={{ uri: image.url }}
                                        style={styles.image}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

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
                            <Text style={styles.modalText}>Edit Research</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalItem, styles.deleteItem]}
                            onPress={handleDelete}
                        >
                            <Text style={[styles.modalText, styles.deleteText]}>Delete Research</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
} 