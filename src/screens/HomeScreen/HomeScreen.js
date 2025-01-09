import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './HomeScreen.styles';

const MOCK_FEATURED = [
    {
        id: '1',
        title: 'Latest Crime Analysis',
        subtitle: 'Top trending cases',
        image: 'https://example.com/image1.jpg'
    },
    {
        id: '2',
        title: 'Forensic Methods',
        subtitle: 'New techniques',
        image: 'https://example.com/image2.jpg'
    }
];

const MOCK_CATEGORIES = [
    {
        id: '1',
        title: 'DNA Analysis',
        icon: 'flask',
        color: '#FF6B6B'
    },
    {
        id: '2',
        title: 'Digital Forensics',
        icon: 'laptop',
        color: '#4ECDC4'
    },
    {
        id: '3',
        title: 'Crime Scene',
        icon: 'search',
        color: '#45B7D1'
    }
];

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Discover</Text>
                    <Ionicons name="grid-outline" size={24} color="#333" />
                </View>

                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Search cases, research, forums..."
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        icon={() => <Ionicons name="search" size={20} color="#666" />}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Research</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeMore}>More</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {MOCK_FEATURED.map(item => (
                            <TouchableOpacity key={item.id} style={styles.featuredCard}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.featuredImage}
                                />
                                <Text style={styles.featuredTitle}>{item.title}</Text>
                                <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.categoriesGrid}>
                        {MOCK_CATEGORIES.map(category => (
                            <TouchableOpacity 
                                key={category.id} 
                                style={[styles.categoryCard, { backgroundColor: category.color }]}
                            >
                                <Ionicons name={category.icon} size={32} color="#fff" />
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
