import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import styles from './HomeScreen.styles';

export default function HomeScreen({ navigation }) {
    const [recentResearch, setRecentResearch] = useState([]);
    const [recentForums, setRecentForums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const researchQuery = query(
                    collection(db, 'research'),
                    orderBy('createdAt', 'desc'),
                    limit(5)
                );
                
                const forumsQuery = query(
                    collection(db, 'forums'),
                    orderBy('lastActivity', 'desc'),
                    limit(5)
                );

                const [researchSnap, forumsSnap] = await Promise.all([
                    getDocs(researchQuery),
                    getDocs(forumsQuery)
                ]);

                const researchData = researchSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const forumsData = forumsSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRecentResearch(researchData);
                setRecentForums(forumsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleResearchPress = (researchId) => {
        navigation.navigate('Research', {
            screen: 'ResearchDetail',
            params: { researchId: researchId },
            initial: false,
            reset: true
        });
    };

    const handleForumPress = (forumId) => {
        navigation.navigate('Forums', {
            screen: 'ForumDetailScreen',
            params: { forumId: forumId },
            initial: false,
            reset: true
        });
    };

    const handleSeeAllResearch = () => {
        navigation.navigate('Research', {
            screen: 'ResearchHub',
            initial: false,
            reset: true
        });
    };

    const handleSeeAllForums = () => {
        navigation.navigate('Forums', {
            screen: 'ForumsScreen',
            initial: false,
            reset: true
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Nordic Crime Lab</Text>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Latest Research</Text>
                                <TouchableOpacity onPress={handleSeeAllResearch}>
                                    <Text style={styles.seeMore}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {recentResearch.map(item => (
                                    <TouchableOpacity 
                                        key={item.id} 
                                        style={styles.researchCard}
                                        onPress={() => handleResearchPress(item.id)}
                                    >
                                        <Image
                                            source={{ 
                                                uri: item.images?.[0]?.url || 'https://via.placeholder.com/150'
                                            }}
                                            style={styles.researchImage}
                                        />
                                        <View style={styles.researchContent}>
                                            <Text style={styles.researchTitle}>{item.title}</Text>
                                            <Text style={styles.researchMeta}>{item.authorName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Active Forums</Text>
                                <TouchableOpacity onPress={handleSeeAllForums}>
                                    <Text style={styles.seeMore}>See all</Text>
                                </TouchableOpacity>
                            </View>
                            {recentForums.map(forum => (
                                <TouchableOpacity 
                                    key={forum.id} 
                                    style={styles.forumCard}
                                    onPress={() => handleForumPress(forum.id)}
                                >
                                    <View style={styles.forumIcon}>
                                        <Ionicons name="chatbubbles" size={24} color="#fff" />
                                    </View>
                                    <View style={styles.forumContent}>
                                        <Text style={styles.forumTitle}>{forum.title}</Text>
                                        <Text style={styles.forumMeta}>
                                            {forum.members?.length || 0} participants
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={24} color="#666" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
