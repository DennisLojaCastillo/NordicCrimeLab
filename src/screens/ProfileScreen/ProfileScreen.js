import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './ProfileScreen.styles';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Profile Screen</Text>
        </View>
    );
}
