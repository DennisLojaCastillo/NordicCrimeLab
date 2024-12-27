import React from 'react';
import { Text } from 'react-native';
import styles from './ChatDetailScreen.styles';
import Layout from '../../components/Layout/Layouts'; // Import Layout-komponenten

export default function ChatDetailScreen() {
    return (
        <Layout>
            <Text style={styles.text}>This is the Chat Detail Screen</Text>
        </Layout>
    );
}
