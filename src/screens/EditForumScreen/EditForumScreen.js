import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { db } from '../../config/firebase';
import { doc, updateDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import styles from './EditForumScreen.styles';

export default function EditForumScreen({ route, navigation }) {
    const { forumId, forum } = route.params;
    
    const [title, setTitle] = useState(forum.title);
    const [description, setDescription] = useState(forum.description);
    const [category, setCategory] = useState(forum.category);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRef = collection(db, 'categories');
                const q = query(categoriesRef, orderBy('name'));
                const querySnapshot = await getDocs(q);
                const categoriesList = [];
                querySnapshot.forEach((doc) => {
                    categoriesList.push({ id: doc.id, ...doc.data() });
                });
                setCategories(categoriesList);
            } catch (error) {
                console.error('Error fetching categories:', error);
                Alert.alert('Error', 'Failed to load categories');
            }
        };

        fetchCategories();
    }, []);

    const handleUpdate = async () => {
        if (!title.trim() || !description.trim() || !category) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const forumRef = doc(db, 'forums', forumId);
            
            await updateDoc(forumRef, {
                title: title.trim(),
                description: description.trim(),
                category: category,
                updatedAt: new Date().toISOString(),
            });

            Alert.alert('Success', 'Forum updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating forum:', error);
            Alert.alert('Error', 'Failed to update forum');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#007BFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Forum</Text>
                    <TouchableOpacity onPress={handleUpdate} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#007BFF" />
                        ) : (
                            <Text style={styles.saveButton}>Save</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter forum title"
                    />

                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter forum description"
                        multiline
                    />

                    <Text style={styles.inputLabel}>Category</Text>
                    <TouchableOpacity
                        style={styles.categorySelector}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.categorySelectorText}>
                            {category || 'Select a category'}
                        </Text>
                        <Ionicons name="chevron-down" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Category Selection Modal */}
                <Modal
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Category</Text>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {categories.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.categoryItem}
                                    onPress={() => {
                                        setCategory(item.name);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.categoryItemText}>{item.name}</Text>
                                    {category === item.name && (
                                        <Ionicons name="checkmark" size={24} color="#007BFF" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
} 