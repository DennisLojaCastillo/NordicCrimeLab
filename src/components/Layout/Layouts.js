import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

export default function Layout({ children }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // Baggrund for hele skærmen
    },
    container: {
        flex: 1,
        padding: 16, // Tilføjer padding til indholdet
        backgroundColor: '#fff', // Hvis du vil adskille det visuelt
    },
});
