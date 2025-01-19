import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    SafeAreaView,
} from 'react-native';
import { auth, db, storage } from '../../config/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { MediaType } from 'expo-image-picker';
import styles from './EditProfileScreen.styles';
import { deleteUser } from 'firebase/auth';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from './EditProfileScreen.styles';

export default function EditProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newAbout, setNewAbout] = useState('');
    const [newProfileImage, setNewProfileImage] = useState('');
    const [newRole, setNewRole] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = auth.currentUser.uid;
                const userDocRef = doc(db, 'users', userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setUserData(data);
                    setNewFirstName(data.firstName);
                    setNewLastName(data.lastName);
                    setNewAbout(data.about);
                    setNewProfileImage(data.profileImage || '');
                    setNewRole(data.role || '');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const hasUnsavedChanges = () => {
            if (isSaving) return false;

            const isProfileImageChanged = newProfileImage && !newProfileImage.includes('http')
                ? true
                : false;

            const hasChanges = newFirstName !== userData?.firstName ||
                   newLastName !== userData?.lastName ||
                   newAbout !== userData?.about ||
                   newRole !== userData?.role ||
                   isProfileImageChanged;

            return hasChanges;
        };

        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!hasUnsavedChanges()) {
                return;
            }

            e.preventDefault();

            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure you want to leave?',
                [
                    { text: "Don't leave", style: 'cancel', onPress: () => {} },
                    {
                        text: 'Discard',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );
        });

        return unsubscribe;
    }, [navigation, userData, newFirstName, newLastName, newAbout, newRole, newProfileImage, isSaving]);

    const validateForm = () => {
        if (!newFirstName.trim()) {
            Alert.alert('Error', 'First name is required');
            return false;
        }
        if (!newLastName.trim()) {
            Alert.alert('Error', 'Last name is required');
            return false;
        }
        if (!newRole.trim()) {
            Alert.alert('Error', 'Role is required');
            return false;
        }
        if (newAbout.trim().length < 10) {
            Alert.alert('Error', 'About section must be at least 10 characters');
            return false;
        }
        return true;
    };

    const uploadImageToFirebase = async (uri) => {
        try {
            console.log('Starting image upload, URI:', uri);
            
            const response = await fetch(uri);
            const blob = await response.blob();
            
            const userId = auth.currentUser.uid;
            const imagePath = `UserProfileImages/${userId}.jpg`;
            console.log('Will upload to path:', imagePath);
            
            const imageRef = ref(storage, imagePath);
            await uploadBytes(imageRef, blob);
            
            const downloadURL = await getDownloadURL(imageRef);
            console.log('Got download URL:', downloadURL);
            
            return downloadURL;
        } catch (error) {
            console.error('Error in uploadImageToFirebase:', error);
            throw error;
        }
    };

    const validateImageUrl = async (url) => {
        try {
            const response = await fetch(url);
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    const deleteOldImage = async (imageUrl) => {
        try {
            if (!imageUrl || !imageUrl.includes('firebase')) return;
            
            // Udtræk den korrekte sti fra URL'en
            const urlPath = `UserProfileImages/${auth.currentUser.uid}.jpg`;
            console.log('Attempting to delete image at path:', urlPath);
            
            const oldImageRef = ref(storage, urlPath);
            await deleteObject(oldImageRef);
            console.log('Old image deleted successfully');
        } catch (error) {
            console.error('Error deleting old image:', error);
        }
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        
        setIsSaving(true);
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            
            let profileImageUrl = userData?.profileImage;
            console.log('Current profile image:', profileImageUrl);

            // Upload nyt billede hvis det er ændret
            if (newProfileImage && newProfileImage !== userData?.profileImage) {
                try {
                    console.log('Attempting to upload new image...');
                    profileImageUrl = await uploadImageToFirebase(newProfileImage);
                    console.log('New profile image URL:', profileImageUrl);
                } catch (error) {
                    console.error('Error handling profile image:', error);
                    Alert.alert('Error', 'Failed to update profile image');
                    setIsSaving(false);
                    return;
                }
            }

            const updateData = {
                firstName: newFirstName,
                lastName: newLastName,
                about: newAbout,
                role: newRole,
                profileImage: profileImageUrl,
                updatedAt: new Date().toISOString(),
            };

            console.log('Updating user document with:', updateData);
            await updateDoc(userDocRef, updateData);
            console.log('Document updated successfully');

            Alert.alert(
                'Success',
                'Profile updated successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setIsSaving(false);
                            navigation.navigate('UserProfile', {
                                refresh: true,
                                timestamp: Date.now()
                            });
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error in handleSave:', error);
            Alert.alert('Error', 'Failed to update profile: ' + error.message);
            setIsSaving(false);
        }
    };

    const pickImage = async () => {
        try {
            console.log('Starting image picker...');
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            console.log('Image picker result:', result);

            if (!result.canceled) {
                console.log('Image selected:', result.assets[0].uri);
                setNewProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image');
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const user = auth.currentUser;
                            const userDocRef = doc(db, 'users', user.uid);

                            // Slet profilbillede hvis det findes
                            if (userData?.profileImage) {
                                await deleteOldImage(userData.profileImage);
                            }

                            // Slet brugerdata og bruger
                            await deleteDoc(userDocRef);
                            await deleteUser(user);

                            Alert.alert("Account deleted successfully.");
                        } catch (error) {
                            console.error('Error deleting account:', error.message);
                            Alert.alert('Error', error.message);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 24 }} />
                </View>

                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={
                            newProfileImage
                                ? { uri: newProfileImage }
                                : require('../../../assets/placeholder/placeholder.png')
                        }
                        style={styles.profileImage}
                    />
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={newFirstName}
                    onChangeText={setNewFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={newLastName}
                    onChangeText={setNewLastName}
                />
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="About"
                    value={newAbout}
                    onChangeText={setNewAbout}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="Role/Job Title"
                    value={newRole}
                    onChangeText={setNewRole}
                />

                <TouchableOpacity 
                    style={[
                        styles.saveButton,
                        isSaving && styles.saveButtonDisabled
                    ]} 
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
