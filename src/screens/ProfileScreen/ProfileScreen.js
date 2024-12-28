import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { auth, db } from '../../config/firebase'; // Import Firestore
import { signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './ProfileScreen.styles'; // Import styles
import { doc, getDoc, onSnapshot } from 'firebase/firestore'; // Importer onSnapshot

// Importer det lokale placeholder-billede
import placeholderImage from '../../../assets/placeholder/placeholder.png';

export default function ProfileScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null); // State til brugerdata
    const [loading, setLoading] = useState(true);

    // Fetch brugerdata fra Firestore
    useEffect(() => {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);

        // Lyt til ændringer i brugerdata i realtid
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserData(docSnap.data());
            } else {
                console.log('No such document!');
            }
            setLoading(false);
        }, (error) => {
            console.error('Error fetching user data:', error.message);
            setLoading(false);
        });

        // Ryd op ved at afmelde lytteren, når komponenten unmountes
        return () => unsubscribe();
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
                <Text style={styles.headerTitle}>Your Profile</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#333" />
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
        </View>
    );
}
