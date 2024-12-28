import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native'; // Tilføj Alert her
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigation.replace('Login'); // Naviger direkte til LoginScreen
        } catch (error) {
            console.error('Logout error:', error.message);
            // Eventuelt vis en fejlmeddelelse på skærmen
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Home Screen</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});
