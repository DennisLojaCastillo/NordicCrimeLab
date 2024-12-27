import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './ProfilePostTab.styles';

export default function ProfilePostTab() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userId = "auth.currentUser.uid"; // Udskift med auth.currentUser.uid
                const q = query(
                    collection(db, 'posts'),
                    where('createdBy', '==', userId)
                );
                const querySnapshot = await getDocs(q);
                const userPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(userPosts);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };

        fetchPosts();
    }, []);

    return (
        <View style={styles.container}>
            {posts.length > 0 ? (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.postTitle}>{item.title}</Text>
                            <Text style={styles.postContent}>{item.content}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noPostsText}>No posts found</Text>
            )}
        </View>
    );
}
