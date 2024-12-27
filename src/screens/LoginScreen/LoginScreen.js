import React, { useState } from 'react';
import { Text, TextInput, Button, Alert } from 'react-native';
import styles from './LoginScreen.styles';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Layout from '../../components/layouts'; // Brug Layout-komponenten

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            // Firebase Login
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Success', 'Logged in successfully');
            // Automatisk redirect håndteres via AppNavigator.js
        } catch (error) {
            console.error('Login error:', error.message);
            Alert.alert('Error', 'Invalid email or password');
        }
    };

    return (
        <Layout>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin} />

            <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
                Don't have an account? Sign Up
            </Text>
        </Layout>
    );
}
