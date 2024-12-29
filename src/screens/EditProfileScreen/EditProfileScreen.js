import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { auth, db, storage } from '../../config/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; // Til billedupload
import styles from './EditProfileScreen.styles';
import { deleteUser } from 'firebase/auth';
import { ref, deleteObject } from 'firebase/storage';

export default function EditProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newAbout, setNewAbout] = useState('');
    const [newProfileImage, setNewProfileImage] = useState('');
    const [newRole, setNewRole] = useState('');

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

    const handleSave = async () => {
        if (!newFirstName || !newLastName || !newAbout || !newRole) {
            Alert.alert('All fields are required!');
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, {
                firstName: newFirstName,
                lastName: newLastName,
                about: newAbout,
                role: newRole,
                profileImage: newProfileImage,
            });

            Alert.alert('Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({                
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setNewProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error.message);
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
                            const profileImageRef = ref(storage, `UserProfileImages/${user.uid}.jpg`);

                            await deleteDoc(userDocRef);
                            await deleteObject(profileImageRef);
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
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>            

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

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
                <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}
