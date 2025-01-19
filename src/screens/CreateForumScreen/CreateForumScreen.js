import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, 
    ScrollView, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    Modal,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { auth } from '../../config/firebase';
import styles from './CreateForumScreen.styles';
import { colors } from './CreateForumScreen.styles';

// Predefinerede farver til kategorier
const CATEGORY_COLORS = [
    '#1A1A1A',  // darkGray
    '#333333',  // textGray
    '#2A2A2A',  // iconGray
    '#1F1F1F',  // Variation af darkGray
    '#262626',  // Variation af darkGray
    '#2D2D2D'   // Variation af darkGray
];

export default function CreateForumScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);

    // Fetch categories from Firebase
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

    const handleCreateNewCategory = async () => {
        if (!newCategory.trim()) {
            Alert.alert('Error', 'Please enter a category name');
            return;
        }

        try {
            setIsLoading(true);
            const categoriesRef = collection(db, 'categories');
            
            // Vælg en farve baseret på antal eksisterende kategorier
            const color = CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length];
            
            const newCategoryDoc = await addDoc(categoriesRef, {
                name: newCategory.trim(),
                color: color,  // Brug predefineret farve i stedet for tilfældig
                createdAt: new Date().toISOString()
            });

            setCategories([...categories, { 
                id: newCategoryDoc.id, 
                name: newCategory.trim(),
                color: color
            }]);
            setCategory(newCategory.trim());
            setNewCategory('');
            setShowNewCategoryModal(false);
            setModalVisible(false);
        } catch (error) {
            console.error('Error creating new category:', error);
            Alert.alert('Error', 'Failed to create new category');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        if (!category) {
            Alert.alert('Error', 'Please select a category');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a description');
            return;
        }

        try {
            setIsLoading(true);
            const forumsRef = collection(db, 'forums');
            
            const newForum = {
                title: title.trim(),
                category,
                description: description.trim(),
                createdAt: new Date().toISOString(),
                userId: auth.currentUser.uid,
                createdBy: auth.currentUser.uid,
                lastActivity: new Date().toISOString(),
                members: [auth.currentUser.uid],
                postCount: 0
            };

            await addDoc(forumsRef, newForum);
            
            setTitle('');
            setCategory('');
            setDescription('');
            navigation.goBack();
            
        } catch (error) {
            console.error('Error creating forum:', error);
            Alert.alert('Error', 'Failed to create forum. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.darkGray} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Forum</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter forum title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.inputLabel}>Category</Text>
                    <TouchableOpacity 
                        style={styles.categorySelector}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={[
                            styles.categorySelectorText,
                            !category && styles.categorySelectorPlaceholder
                        ]}>
                            {category || 'Select a category'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>

                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Enter forum description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Create Forum</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
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

                        <ScrollView style={styles.categoryList}>
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

                        <SafeAreaView style={styles.modalFooter}>
                            <TouchableOpacity 
                                style={styles.addCategoryButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    setShowNewCategoryModal(true);
                                }}
                            >
                                <Ionicons name="add-circle-outline" size={24} color="#007BFF" />
                                <Text style={styles.addCategoryText}>Create New Category</Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showNewCategoryModal}
                onRequestClose={() => setShowNewCategoryModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Create New Category</Text>
                            <TouchableOpacity 
                                onPress={() => setShowNewCategoryModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.newCategoryContainer}>
                            <Text style={styles.inputLabel}>Category Name</Text>
                            <TextInput
                                style={styles.newCategoryInput}
                                placeholder="Enter category name"
                                value={newCategory}
                                onChangeText={setNewCategory}
                                autoFocus={true}
                            />

                            <View style={styles.newCategoryButtons}>
                                <TouchableOpacity 
                                    style={[styles.newCategoryButton, styles.cancelButton]}
                                    onPress={() => {
                                        setShowNewCategoryModal(false);
                                        setNewCategory('');
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.newCategoryButton, styles.createButton]}
                                    onPress={handleCreateNewCategory}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.createButtonText}>Create</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
