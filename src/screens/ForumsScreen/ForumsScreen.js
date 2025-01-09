import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { db } from '../../config/firebase';
import { collection, onSnapshot, doc, getDoc, query, orderBy } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ForumsScreen.styles';

export default function ForumsScreen({ navigation }) {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState({});
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const categoriesRef = collection(db, 'categories');
        const categoriesQuery = query(categoriesRef, orderBy('name'));
        const unsubscribeCategories = onSnapshot(categoriesQuery, (snapshot) => {
            const categoriesData = {};
            snapshot.forEach((doc) => {
                const categoryData = doc.data();
                categoriesData[categoryData.name] = categoryData;
            });
            setCategories(categoriesData);
        });

        const forumsRef = collection(db, 'forums');
        const unsubscribeForums = onSnapshot(forumsRef, async (snapshot) => {
            const forumsList = [];
            const userIds = new Set();

            snapshot.forEach((doc) => {
                const forumData = doc.data();
                userIds.add(forumData.createdBy);
                forumsList.push({ id: doc.id, ...forumData });
            });

            const usersData = {};
            for (const userId of userIds) {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    usersData[userId] = userDoc.data();
                }
            }

            setUsers(usersData);
            setForums(forumsList);
            setLoading(false);
        });

        return () => {
            unsubscribeCategories();
            unsubscribeForums();
        };
    }, []);

    const filteredForums = forums.filter(forum => 
        forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        forum.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Forums</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateForumScreen')}>
                        <Ionicons name="add-circle-outline" size={24} color="#007BFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Search forums..."
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        icon={() => <Ionicons name="search" size={20} color="#666" />}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Active Discussions</Text>
                    </View>
                    {filteredForums.map(forum => {
                        const userData = users[forum.createdBy] || {};
                        const creatorName = userData.firstName && userData.lastName 
                            ? `${userData.firstName} ${userData.lastName}`
                            : 'Unknown User';

                        return (
                            <TouchableOpacity 
                                key={forum.id}
                                style={styles.forumCard}
                                onPress={() => navigation.navigate('ForumDetailScreen', { forumId: forum.id })}
                            >
                                <View style={styles.forumContent}>
                                    <Text style={styles.forumTitle}>{forum.title}</Text>
                                    <View style={styles.forumMeta}>
                                        <Text style={styles.lightText}>By {creatorName}</Text>
                                    </View>
                                    <Text style={styles.categoryTag}>{forum.category}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
