import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        padding: 16,
    },
    searchBar: {
        borderRadius: 10,
        elevation: 0,
        backgroundColor: '#f5f5f5',
    },
    searchInput: {
        fontSize: 16,
    },
    section: {
        padding: 16,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    researchCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    researchContent: {
        padding: 16,
    },
    researchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    abstract: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTag: {
        fontSize: 12,
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        color: '#fff',
        marginLeft: 4,
        marginRight: 12,
        fontSize: 14,
    },
}); 