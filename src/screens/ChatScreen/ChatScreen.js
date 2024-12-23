import React from 'react';
import { View, Text } from 'react-native';
import styles from './ChatScreen.styles';

export default function ChatScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Chat Screen</Text>
        </View>
    );
}
