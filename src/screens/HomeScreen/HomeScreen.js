import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './HomeScreen.styles';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function HomeScreen() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    } else {
                        console.log('No user data found!');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Text style={styles.welcomeText}>Hello, {userData.name}</Text>
                    <Text style={styles.subtitle}>Welcome to NordicCrimeLab</Text>
                    <Image
                        source={{
                            uri: userData.profileImage || 'https://via.placeholder.com/150',
                        }}
                        style={styles.avatar}
                    />
                </>
            ) : (
                <Text style={styles.loadingText}>Loading...</Text>
            )}
        </View>
    );
}
