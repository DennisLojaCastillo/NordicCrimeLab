import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { db } from '../../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import styles from './ForumsScreen.styles';

export default function ForumsScreen({ navigation }) {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const forumsRef = collection(db, 'forums');
        const unsubscribe = onSnapshot(forumsRef, (snapshot) => {
            const forumsList = [];
            snapshot.forEach((doc) => {
                forumsList.push({ id: doc.id, ...doc.data() });
            });
            setForums(forumsList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderForumItem = ({ item }) => (
        <TouchableOpacity
            style={styles.forumCard}
            onPress={() => navigation.navigate('ForumDetailScreen', { forumId: item.id })}
        >
            <Text style={styles.forumTitle}>{item.title}</Text>
            <Text style={styles.forumCategory}>{item.category}</Text>
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
            <Text style={styles.screenTitle}>All Forums</Text>
            <FlatList
                data={forums}
                keyExtractor={(item) => item.id}
                renderItem={renderForumItem}
            />
        </View>
    );
}
