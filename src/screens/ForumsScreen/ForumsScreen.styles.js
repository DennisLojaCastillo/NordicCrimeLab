import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#333',
    },
    searchContainer: {
        padding: 16,
    },
    searchBar: {
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
        elevation: 0,
    },
    searchInput: {
        fontSize: 14,
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
        color: '#333',
    },
    forumCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        overflow: 'hidden',
    },
    forumContent: {
        backgroundColor: '#6C5CE7',
        padding: 15,
        borderRadius: 10,
        minHeight: 100,
    },
    forumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
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
        color: '#333',
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
