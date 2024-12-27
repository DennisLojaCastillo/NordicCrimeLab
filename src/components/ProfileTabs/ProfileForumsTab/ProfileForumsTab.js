import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './ProfileForumsTab.styles';

export default function ProfileForumsTab() {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const userId = "auth.currentUser.uid"; // Udskift med auth.currentUser.uid
                const q = query(
                    collection(db, 'forums'),
                    where('members', 'array-contains', userId)
                );
                const querySnapshot = await getDocs(q);
                const userForums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setForums(userForums);
            } catch (error) {
                console.error('Error fetching forums:', error.message);
            }
        };

        fetchForums();
    }, []);

    return (
        <View style={styles.container}>
            {forums.length > 0 ? (
                <FlatList
                    data={forums}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.forum}>
                            <Text style={styles.forumName}>{item.name}</Text>
                            <Text style={styles.forumDescription}>{item.description}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noForumsText}>No forums found</Text>
            )}
        </View>
    );
}
