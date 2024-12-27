import React from 'react';
import { Text } from 'react-native';
import styles from './ChatScreen.styles';
import Layout from '../../components/Layout/Layouts'; // Import Layout-komponenten

export default function ChatScreen() {
    return (
        <Layout>
            <Text style={styles.text}>This is the Chat Screen</Text>
        </Layout>
    );
}
