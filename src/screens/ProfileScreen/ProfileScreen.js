import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { auth, db } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './ProfileScreen.styles';
import { doc, collection, query, where, onSnapshot } from 'firebase/firestore';

// Importer placeholder-billede
import placeholderImage from '../../../assets/placeholder/placeholder.png';

export default function ProfileScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userForums, setUserForums] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch brugerdata og brugerfora i realtid
    useEffect(() => {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        const forumsQuery = query(collection(db, 'forums'), where('createdBy', '==', userId));

        // Lyt til brugerdata
        const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log('No user data found!');
            }
        });

        // Lyt til fora oprettet af brugeren
        const unsubscribeForums = onSnapshot(forumsQuery, (querySnapshot) => {
            const forums = [];
            querySnapshot.forEach((doc) => {
                forums.push({ id: doc.id, ...doc.data() });
            });
            setUserForums(forums);
            setLoading(false);
        });

        return () => {
            unsubscribeUser();
            unsubscribeForums();
        };
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const renderForumItem = ({ item }) => (
        <TouchableOpacity
            style={styles.forumCard}
            onPress={() => navigation.navigate('ForumDetailScreen', { forumId: item.id })}
        >
            <Text style={styles.forumTitle}>{item.title}</Text>
        </TouchableOpacity>
    );
    

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>                
                <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="settings-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Dropdown Menu */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                            toggleModal();
                            navigation.navigate('EditUserProfile');
                        }}
                    >
                        <Text style={styles.modalText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                            toggleModal();
                            handleLogout();
                        }}
                    >
                        <Text style={styles.modalText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <Image
                    source={userData?.profileImage ? { uri: userData.profileImage } : placeholderImage}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>
                    {userData?.firstName} {userData?.lastName}
                </Text>
                <Text style={styles.aboutText}>{userData?.about}</Text>
            </View>

            {/* User Forums */}
            <View style={styles.forumsContainer}>
                <Text style={styles.sectionTitle}>Your Forums</Text>
                <FlatList
                    data={userForums}
                    keyExtractor={(item) => item.id}
                    renderItem={renderForumItem}
                />
            </View>
        </View>
    );
}
