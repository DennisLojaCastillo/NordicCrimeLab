import React from 'react';
import { Text } from 'react-native';
import styles from './ForumDetailScreen.styles';
import Layout from '../../components/Layout/Layouts'; // Import Layout-komponenten

export default function ForumDetailScreen({ route }) {
    const { forumId } = route.params; // Modtag forumId fra navigation

    // Her kan vi forberede os på at hente data for det specifikke forum
    return (
        <Layout>
            <Text style={styles.text}>Forum ID: {forumId}</Text>
            <Text style={styles.text}>This is the Forum Detail Screen</Text>
        </Layout>
    );
}

