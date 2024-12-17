import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import styles from './SignUpScreen.styles';
import { auth, db } from '../../config/firebase'; // Firebase instance
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            // Firebase Authentication - Registrer bruger
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Gem brugerdata i Firestore
            await setDoc(doc(db, 'users', user.uid), {
                name: name,
                email: email,
                createdAt: serverTimestamp(),
            });

            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('Home'); // Navigér til HomeScreen
        } catch (error) {
            console.error('Error signing up:', error.message);
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
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

            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
}
