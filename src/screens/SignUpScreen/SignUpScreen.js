import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import styles from './SignUpScreen.styles'; // Import styles

export default function SignUpScreen({ navigation }) {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [role, setRole] = useState('');
    const [about, setAbout] = useState('');

    const handleNextStep = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (step === 1) {
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                Alert.alert('Error', 'Please fill in all fields.');
                return;
            }

            if (!emailRegex.test(email)) {
                Alert.alert('Error', 'Please enter a valid email address.');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }

            setStep(2);
        } else if (step === 2) {
            if (!profileImage || !role) {
                Alert.alert('Error', 'Please add a profile image and your role.');
                return;
            }

            handleSignUp();
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
            const storageRef = ref(storage, `UserProfileImages/${auth.currentUser.uid}.jpg`);
            await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }
    };

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const profileImageUrl = await uploadImage(profileImage);

            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                role,
                about,
                profileImage: profileImageUrl,
                createdAt: new Date(),
            });
        } catch (error) {
            console.error('Error during sign up:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>                    
                    {step === 1 && (
                        <>
                            <Text style={styles.title}>Start your journey here!</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleNextStep}
                            >
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Text style={styles.title}>Tell us more about yourself</Text>
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={
                                        profileImage
                                            ? { uri: profileImage }
                                            : require('../../../assets/placeholder/placeholder.png')
                                    }
                                    style={styles.profileImage}
                                />
                                <TouchableOpacity
                                    style={styles.cameraIconWrapper}
                                    onPress={pickImage}
                                >
                                    <Ionicons name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Role/Job Title"
                                value={role}
                                onChangeText={setRole}
                            />
                            <TextInput
                                style={[styles.input, styles.aboutInput]}
                                placeholder="About Me (Optional)"
                                value={about}
                                onChangeText={setAbout}
                                multiline
                            />
                            <View style={styles.navigationButtons}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => setStep(1)}
                                >
                                    <Text style={styles.buttonText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonCreate}
                                    onPress={handleNextStep}
                                >
                                    <Text style={styles.buttonText}>Create account</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
