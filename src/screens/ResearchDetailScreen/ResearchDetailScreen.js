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
import { NOTIFICATION_TYPES } from '../../services/NotificationService';
import { saveNotification } from '../../services/NotificationService';

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
            const researchRef = doc(db, 'research', researchId);
            if (!hasLiked) {
                // Like research
                await updateDoc(researchRef, {
                    likes: (research.likes || 0) + 1,
                    likedBy: arrayUnion(auth.currentUser.uid)
                });

                // Send notification til research ejeren
                if (research.createdBy !== auth.currentUser.uid) {
                    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
                    const userData = userDoc.data();
                    
                    await saveNotification(
                        research.createdBy,
                        NOTIFICATION_TYPES.RESEARCH_LIKE,
                        {
                            researchId: researchId,
                            researchTitle: research.title,
                            likerName: `${userData.firstName} ${userData.lastName}`
                        }
                    );
                }
            } else {
                // Unlike research
                await updateDoc(researchRef, {
                    likes: Math.max((research.likes || 0) - 1, 0), // Sikrer at likes ikke går under 0
                    likedBy: arrayRemove(auth.currentUser.uid)
                });
            }
            setHasLiked(!hasLiked);
        } catch (error) {
            console.error('Error updating like:', error);
            Alert.alert('Error', 'Could not update like');
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
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Research Details</Text>
                    {research?.createdBy === currentUser.uid ? (
                        <TouchableOpacity onPress={toggleModal}>
                            <Ionicons name="ellipsis-vertical" size={24} color="#000" />
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
                        <View style={styles.likesContainer}>
                            <Ionicons 
                                name="heart" 
                                size={16} 
                                color="#ff4444" 
                            />
                            <Text style={styles.likesCount}>
                                {research.likes || 0} likes
                            </Text>
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