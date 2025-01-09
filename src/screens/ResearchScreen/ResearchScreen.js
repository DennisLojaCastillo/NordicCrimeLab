import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { db } from '../../config/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './ResearchScreen.styles';

// Farver til forskellige kategorier
const CATEGORY_COLORS = {
    'Forensic Science': '#FF6B6B',
    'Digital Forensics': '#4ECDC4',
    'Behavioral Analysis': '#45B7D1',
    'Crime Scene Investigation': '#6C5CE7',
    'Evidence Analysis': '#A8E6CF',
    'General': '#FFB6B9'
};

export default function ResearchScreen({ navigation }) {
    const [research, setResearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
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
    }, []);

    const filteredResearch = research.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
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
                    <Text style={styles.headerTitle}>Research</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateResearchScreen')}>
                        <Ionicons name="add-circle-outline" size={24} color="#007BFF" />
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
                            onPress={() => navigation.navigate('ResearchDetailScreen', { researchId: item.id })}
                        >
                            <View 
                                style={[
                                    styles.researchContent, 
                                    { backgroundColor: CATEGORY_COLORS[item.category] || CATEGORY_COLORS.General }
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
                                        <Ionicons name="document-text" size={16} color="#fff" />
                                        <Text style={styles.statsText}>{item.citations || 0}</Text>
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