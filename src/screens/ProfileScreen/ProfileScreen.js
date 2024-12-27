import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { format } from 'date-fns'; // Til datoformatering
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Layout from '../../components/Layout/Layouts';
import styles from './ProfileScreen.styles';
import ProfilePostTab from '../../components/ProfileTabs/ProfilePostTab/ProfilePostTab';
import ProfileAboutTab from '../../components/ProfileTabs/ProfileAboutTab/ProfileAboutTab';
import ProfileForumsTab from '../../components/ProfileTabs/ProfileForumsTab/ProfileForumsTab';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('Posts'); // Håndter den aktive tab

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            Alert.alert('Success', 'You have been logged out.');
            navigation.navigate('Login'); // Naviger til LoginScreen
        } catch (error) {
            console.error('Error logging out:', error.message);
            Alert.alert('Error', 'Failed to log out.');
        }
    };
    

    return (
        <Layout>
            {/* Header */}
            <View style={styles.header}>
                {/* Profilbillede */}
                <Image
                    source={
                        userData?.profileImage
                            ? { uri: userData.profileImage }
                            : require('../../../assets/placeholder/placeholder.png')
                    }
                    style={styles.profileImage}
                />
                {/* Brugernavn */}
                <Text style={styles.name}>{userData?.name || 'User Name'}</Text>
                {/* Oprettelsesdato */}
                <Text style={styles.memberSince}>
                    {userData?.createdAt
                        ? `Member since ${format(new Date(userData.createdAt.seconds * 1000), 'dd MMM yyyy')}`
                        : ''}
                </Text>
                {/* Logout-knap */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Tab-knapper */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Posts' && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveTab('Posts')}
                >
                    <Text style={styles.tabButtonText}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Forums' && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveTab('Forums')}
                >
                    <Text style={styles.tabButtonText}>Forums</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'About' && styles.activeTabButton,
                    ]}
                    onPress={() => setActiveTab('About')}
                >
                    <Text style={styles.tabButtonText}>About</Text>
                </TouchableOpacity>
            </View>

            {/* Indhold baseret på aktiv tab */}
            <View style={styles.content}>
                {activeTab === 'Posts' ? (
                    <ProfilePostTab />
                ) : activeTab === 'Forums' ? (
                    <ProfileForumsTab />
                ) : (
                    <ProfileAboutTab />
                )}
            </View>
        </Layout>
    );
}
