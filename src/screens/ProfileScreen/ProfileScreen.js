import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import { auth, db } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './ProfileScreen.styles';
import { doc, collection, query, where, onSnapshot } from 'firebase/firestore';
import placeholderImage from '../../../assets/placeholder/placeholder.png';
import { colors } from './ProfileScreen.styles';

const CATEGORY_COLORS = {
    'DNA Analysis': colors.primary,
    'Digital Forensics': colors.darkGray,
    'Crime Scene': colors.textGray,
    'General': colors.iconGray,
    'Evidence': colors.lightGray,
    'Research': colors.error
};

export default function ProfileScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userForums, setUserForums] = useState([]);
    const [memberForums, setMemberForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('created');

    useEffect(() => {
        let unsubscribeUser;
        let unsubscribeCreatedForums;
        let unsubscribeMemberForums;

        const fetchData = async () => {
            // Tjek om bruger er logget ind
            const currentUser = auth.currentUser;
            if (!currentUser) {
                setLoading(false);
                return;
            }
            
            const userId = currentUser.uid;
            setLoading(true);

            try {
                // Fetch user data
                const userDocRef = doc(db, 'users', userId);
                unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                });

                // Fetch created forums
                const createdForumsQuery = query(
                    collection(db, 'forums'), 
                    where('createdBy', '==', userId)
                );
                unsubscribeCreatedForums = onSnapshot(createdForumsQuery, (querySnapshot) => {
                    const forums = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setUserForums(forums);
                });

                // Fetch member forums
                const memberForumsQuery = query(
                    collection(db, 'forums'), 
                    where('members', 'array-contains', userId)
                );
                unsubscribeMemberForums = onSnapshot(memberForumsQuery, (querySnapshot) => {
                    const forums = querySnapshot.docs
                        .filter(doc => doc.data().createdBy !== userId)
                        .map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                    setMemberForums(forums);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Start lytning kun hvis bruger er logget ind
        if (auth.currentUser) {
            fetchData();
        }

        // Cleanup funktion
        return () => {
            if (unsubscribeUser) unsubscribeUser();
            if (unsubscribeCreatedForums) unsubscribeCreatedForums();
            if (unsubscribeMemberForums) unsubscribeMemberForums();
        };
    }, [auth.currentUser]); // Tilføj auth.currentUser som dependency

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleLogout = async () => {
        try {
            // Først lukker vi modalen
            setModalVisible(false);
            
            // Stop alle listeners før logout
            setUserData(null);
            setUserForums([]);
            setMemberForums([]);
            
            // Derefter logger vi ud
            await signOut(auth);
            
            // Naviger til root navigator og reset til Login
            navigation.getParent()?.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error logging out:', error.message);
            Alert.alert('Error', 'Could not log out. Please try again.');
        }
    };
    

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.headerTitle}>Profile</Text>
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={styles.headerRight}>
                        <Ionicons name="settings-outline" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <ScrollView style={styles.scrollView} bounces={false}>
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

                    {/* Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'created' && styles.activeTab]}
                            onPress={() => setActiveTab('created')}
                        >
                            <Text style={[styles.tabText, activeTab === 'created' && styles.activeTabText]}>
                                Your Forums
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'joined' && styles.activeTab]}
                            onPress={() => setActiveTab('joined')}
                        >
                            <Text style={[styles.tabText, activeTab === 'joined' && styles.activeTabText]}>
                                Joined Forums
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Forums List */}
                    <View style={styles.forumList}>
                        {(activeTab === 'created' ? userForums : memberForums).map((forum) => (
                            <TouchableOpacity
                                key={forum.id}
                                style={styles.forumCard}
                                onPress={() => {
                                    navigation.navigate('Forums', {
                                        screen: 'ForumDetailScreen',
                                        params: { forumId: forum.id, forumTitle: forum.title }
                                    });
                                }}
                            >
                                <View style={[
                                    styles.forumContent, 
                                    { backgroundColor: CATEGORY_COLORS[forum.category] || CATEGORY_COLORS.General }
                                ]}>
                                    <Text style={styles.forumTitle}>{forum.title}</Text>
                                    <Text style={styles.categoryTag}>{forum.category}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        {(activeTab === 'created' ? userForums : memberForums).length === 0 && (
                            <Text style={styles.emptyText}>
                                {activeTab === 'created' 
                                    ? "You haven't created any forums yet"
                                    : "You haven't joined any forums yet"
                                }
                            </Text>
                        )}
                    </View>
                </ScrollView>

                {/* Settings Modal */}
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
                            onPress={handleLogout}
                        >
                            <Text style={styles.modalText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}
