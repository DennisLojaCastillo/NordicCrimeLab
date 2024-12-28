import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ForumDetailScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Forum Detail Screen</Text>
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
        color: '#333',
    },
});
