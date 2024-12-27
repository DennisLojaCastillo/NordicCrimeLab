import React from 'react';
import { Text } from 'react-native';
import styles from './CreatePostScreen.styles';
import Layout from '../../components/Layout/Layouts'; // Import Layout-komponenten

export default function CreatePostScreen() {
    return (
        <Layout>
            <Text style={styles.text}>This is the Create Post Screen</Text>
        </Layout>
    );
}
