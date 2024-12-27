import React, { useEffect, useState } from 'react';
import {View, Text } from 'react-native';
import styles from './HomeScreen.styles';
import { auth, db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '../../components/Layout/Layouts'; // Brug Layout-komponenten

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
        <Layout>
            <View style={styles.header}>
                {/* Velkomsttekst */}
                <View style={styles.greetingContainer}>
                    {userData && <Text style={styles.welcomeText}>Hello, {userData.name}</Text>}
                </View>
            </View>
        </Layout>
    );
}
