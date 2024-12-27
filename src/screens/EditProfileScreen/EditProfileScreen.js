import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { auth, db, storage } from '../../config/firebase'; // Firebase konfiguration
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Layout from '../../components/Layout/Layouts';
import styles from './EditProfileScreen.styles';

export default function EditProfileScreen({ navigation }) {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const data = userDocSnap.data();
                        setName(data.name || '');
                        setEmail(data.email || '');
                        setBio(data.bio || '');
                        setProfileImage(data.profileImage || null);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData();
    }, []);

    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setProfileImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error.message);
        }
    };

    const uploadImage = async (imageUri) => {
        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}.jpg`);
            await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }
    };

    const handleSave = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;
            const userDocRef = doc(db, 'users', user.uid);

            let imageUrl = profileImage;
            if (profileImage && typeof profileImage !== 'string') {
                imageUrl = await uploadImage(profileImage);
            }

            await updateDoc(userDocRef, {
                name,
                email,
                bio,
                profileImage: imageUrl || null,
            });

            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error saving profile:', error.message);
            Alert.alert('Error', 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>

                {/* Profilbillede */}
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text>No Image</Text>
                    </View>
                )}
                <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
                    <Text style={styles.imageButtonText}>Change Profile Picture</Text>
                </TouchableOpacity>

                {/* Navn */}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {/* Email */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                {/* Bio */}
                <TextInput
                    style={styles.input}
                    placeholder="Bio"
                    value={bio}
                    onChangeText={setBio}
                />

                {/* Gem knap */}
                <TouchableOpacity
                    onPress={handleSave}
                    style={styles.saveButton}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </View>
        </Layout>
    );
}
