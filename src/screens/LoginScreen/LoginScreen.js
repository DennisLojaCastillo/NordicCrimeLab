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
} from 'react-native';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './LoginScreen.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);                    
        } catch (error) {
            console.error('Error logging in:', error.message);
            alert('Invalid email or password.');
        }
    };
    

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image
                        source={require('../../../assets/logo/main_logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Welcome to the community</Text>
                    <Text style={styles.subtitle}>Log in with one of the following</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={24} color="#EA4335" />
                            <Text style={styles.socialButtonText}>With Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={24} color="#000" />
                            <Text style={styles.socialButtonText}>With Apple</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupText}>
                        First time here?{' '}
                        <Text
                            style={styles.signupLink}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Sign up for free
                        </Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
