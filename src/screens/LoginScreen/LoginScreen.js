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
                    <Text style={styles.title}>Welcome back!</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
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
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.signupText}>
                        New to Nordic Crime Lab?{' '}
                        <Text
                            style={styles.signupLink}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
