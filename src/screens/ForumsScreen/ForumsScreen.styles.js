import { StyleSheet, Platform } from 'react-native';

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
};

export { colors };

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 16 : 8,
        marginTop: Platform.OS === 'android' ? 30 : 0,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    searchContainer: {
        padding: 16,
    },
    searchBar: {
        borderRadius: 12,
        backgroundColor: colors.lightGray,
        elevation: 0,
    },
    searchInput: {
        fontSize: 14,
        color: colors.textGray,
    },
    section: {
        padding: 16,
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    forumCard: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        overflow: 'hidden',
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    forumContent: {
        backgroundColor: colors.darkGray,
        padding: 15,
        borderRadius: 10,
        minHeight: 100,
    },
    forumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: colors.white,
    },
    forumMeta: {
        marginBottom: 8,
    },
    lightText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
    },
    categoryTag: {
        fontSize: 12,
        color: colors.darkGray,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
