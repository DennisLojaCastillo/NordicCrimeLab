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
    Alert,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth, storage } from '../../config/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from './EditResearchScreen.styles'; // Vi vil genbruge styles fra CreateResearchScreen

export default function EditResearchScreen({ route, navigation }) {
    const { researchId, research } = route.params;
    
    const [title, setTitle] = useState(research.title);
    const [abstract, setAbstract] = useState(research.abstract);
    const [category, setCategory] = useState(research.category);
    const [keywords, setKeywords] = useState(research.keywords.join(', '));
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
    const [images, setImages] = useState(research.images || []);
    const [uploading, setUploading] = useState(false);

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
            const newCategoryDoc = await addDoc(categoriesRef, {
                name: newCategory.trim(),
                createdAt: new Date().toISOString()
            });

            setCategories([...categories, { 
                id: newCategoryDoc.id, 
                name: newCategory.trim() 
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

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                setUploading(true);
                const uploadedUrls = await Promise.all(
                    result.assets.map(async (asset) => {
                        const response = await fetch(asset.uri);
                        const blob = await response.blob();
                        
                        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
                        const storageRef = ref(storage, `research_images/${auth.currentUser.uid}/${fileName}`);
                        
                        await uploadBytes(storageRef, blob);
                        const url = await getDownloadURL(storageRef);
                        
                        return {
                            url,
                            fileName
                        };
                    })
                );

                setImages([...images, ...uploadedUrls]);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            Alert.alert('Error', 'Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = (index) => {
        Alert.alert(
            'Delete Image',
            'Are you sure you want to remove this image?',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: () => {
                        const newImages = [...images];
                        newImages.splice(index, 1);
                        setImages(newImages);
                    }
                }
            ]
        );
    };

    const handleUpdate = async () => {
        if (!title.trim() || !abstract.trim() || !category) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        try {
            setIsLoading(true);
            const researchRef = doc(db, 'research', researchId);
            
            // Konverter keywords string til array
            const keywordsArray = keywords
                .split(',')
                .map(keyword => keyword.trim())
                .filter(keyword => keyword.length > 0);

            const researchData = {
                title: title.trim(),
                abstract: abstract.trim(),
                category,
                keywords: keywordsArray,
                images: images,
                lastUpdated: new Date().toISOString()
            };

            await updateDoc(researchRef, researchData);
            
            Alert.alert('Success', 'Research updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating research:', error);
            Alert.alert('Error', 'Failed to update research');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#007BFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Research</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter research title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.inputLabel}>Category</Text>
                    <TouchableOpacity 
                        style={styles.categorySelector}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.categorySelectorText}>
                            {category}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color="#666" />
                    </TouchableOpacity>

                    <Text style={styles.inputLabel}>Abstract</Text>
                    <TextInput
                        style={[styles.input, styles.abstractInput]}
                        placeholder="Enter research abstract"
                        value={abstract}
                        onChangeText={setAbstract}
                        multiline
                        numberOfLines={4}
                    />

                    <Text style={styles.inputLabel}>Keywords</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter keywords (comma separated)"
                        value={keywords}
                        onChangeText={setKeywords}
                    />

                    <View style={styles.imagesSection}>
                        <Text style={styles.inputLabel}>Images</Text>
                        
                        <View style={styles.imageGrid}>
                            {images.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image 
                                        source={{ uri: image.url }} 
                                        style={styles.imagePreview} 
                                    />
                                    <TouchableOpacity 
                                        style={styles.deleteImageButton}
                                        onPress={() => deleteImage(index)}
                                    >
                                        <Ionicons name="close-circle" size={24} color="#ff4444" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            
                            <TouchableOpacity 
                                style={styles.addImageButton}
                                onPress={pickImage}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <ActivityIndicator color="#007BFF" />
                                ) : (
                                    <>
                                        <Ionicons name="camera" size={24} color="#007BFF" />
                                        <Text style={styles.addImageText}>Add Images</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.submitButton}
                        onPress={handleUpdate}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Update Research</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Category Selection Modal */}
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
                    </View>
                </View>
            </Modal>

            {/* New Category Modal */}
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