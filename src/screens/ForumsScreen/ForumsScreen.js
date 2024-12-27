import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './ForumsScreen.styles';
import Layout from '../../components/Layout/Layouts'; // Import Layout
import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function ForumsScreen({ navigation }) {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const q = query(collection(db, 'forums'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const forumsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setForums(forumsList);
            } catch (error) {
                console.error('Error fetching forums:', error.message);
            }
        };

        fetchForums();
    }, []);

    const renderForumItem = ({ item }) => (
        <TouchableOpacity
            style={styles.forumItem}
            onPress={() => navigation.navigate('ForumDetailScreen', { forumId: item.id })}
        >
            <Text style={styles.forumName}>{item.name}</Text>
            <Text style={styles.forumDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <Layout>
            <Text style={styles.title}>Forums</Text>
            <FlatList
                data={forums}
                keyExtractor={(item) => item.id}
                renderItem={renderForumItem}
                contentContainerStyle={styles.listContainer}
            />
        </Layout>
    );
}
