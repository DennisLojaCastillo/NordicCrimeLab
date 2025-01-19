import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { colors, categoryColors } from './ResearchHubScreen.styles';
import { useFocusEffect } from '@react-navigation/native';

export default function ResearchHubScreen({ navigation }) {
    const [research, setResearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const researchRef = collection(db, 'research');
            const q = query(researchRef, orderBy('createdAt', 'desc'));
            
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const researchList = [];
                snapshot.forEach((doc) => {
                    researchList.push({ id: doc.id, ...doc.data() });
                });
                setResearch(researchList);
                setLoading(false);
            });

            return () => unsubscribe();
        }, [])
    );

    const filteredResearch = research.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.keywords && item.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ))
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
                    <Text style={styles.headerTitle}>Research Hub</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateResearch')}>
                        <Ionicons name="add-circle-outline" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Search research..."
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        icon={() => <Ionicons name="search" size={20} color="#666" />}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Research</Text>
                    </View>
                    {filteredResearch.map(item => (
                        <TouchableOpacity 
                            key={item.id}
                            style={styles.researchCard}
                            onPress={() => navigation.navigate('ResearchDetail', { researchId: item.id })}
                        >
                            <View 
                                style={[
                                    styles.researchContent, 
                                    { backgroundColor: categoryColors[item.category] || categoryColors.General }
                                ]}
                            >
                                <Text style={styles.researchTitle}>{item.title}</Text>
                                <Text style={styles.abstract} numberOfLines={2}>
                                    {item.abstract}
                                </Text>
                                <View style={styles.metaContainer}>
                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.categoryTag}>{item.category}</Text>
                                    </View>
                                    <View style={styles.statsContainer}>
                                        <Ionicons name="heart" size={16} color="#fff" />
                                        <Text style={styles.statsText}>{item.likes || 0}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
