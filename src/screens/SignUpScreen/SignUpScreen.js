import React, { useState, useEffect } from 'react';
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
    Modal,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import styles, { colors } from './SignUpScreen.styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
    const [birthDate, setBirthDate] = useState(new Date());
    const [country, setCountry] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const sortedCountries = data
                    .map(country => country.name.common)
                    .sort();
                setCountries(sortedCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
                // Fallback countries if API fails
                setCountries(['Denmark', 'Norway', 'Sweden', 'Finland', 'Iceland']);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

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

            if (!country) {
                Alert.alert('Error', 'Please enter your country.');
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

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirthDate(date);
        hideDatePicker();
    };

    const handleCountrySelect = (selectedCountry) => {
        setCountry(selectedCountry);
        setIsCountryModalVisible(false);
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
                            <Image
                                source={require('../../../assets/logo/main_logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Sign up</Text>
                            <Text style={styles.subtitle}>Sign up with one of the following</Text>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons name="logo-google" size={24} color={colors.primary} />
                                    <Text style={styles.socialButtonText}>With Google</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Ionicons name="logo-apple" size={24} color={colors.primary} />
                                    <Text style={styles.socialButtonText}>With Apple</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#999"
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
                            <Text style={styles.loginText}>
                                Already have an account?{' '}
                                <Text
                                    style={styles.loginLink}
                                    onPress={() => navigation.navigate('Login')}
                                >
                                    Log In
                                </Text>
                            </Text>
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
                            <TouchableOpacity
                                onPress={showDatePicker}
                                style={styles.input}
                            >
                                <Text>{birthDate.toDateString()}</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setIsCountryModalVisible(true)}
                            >
                                <Text style={country ? styles.inputText : styles.placeholderText}>
                                    {country || 'Select country'}
                                </Text>
                            </TouchableOpacity>
                            <Modal
                                visible={isCountryModalVisible}
                                animationType="slide"
                                transparent={true}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>Select Country</Text>
                                        <ScrollView>
                                            {isLoading ? (
                                                <Text style={styles.loadingText}>Loading countries...</Text>
                                            ) : (
                                                countries.map((item) => (
                                                    <TouchableOpacity
                                                        key={item}
                                                        style={styles.countryItem}
                                                        onPress={() => handleCountrySelect(item)}
                                                    >
                                                        <Text style={styles.countryText}>{item}</Text>
                                                    </TouchableOpacity>
                                                ))
                                            )}
                                        </ScrollView>
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => setIsCountryModalVisible(false)}
                                        >
                                            <Text style={styles.closeButtonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
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
