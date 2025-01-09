import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

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
    welcomeText: {
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
        marginBottom: 16,
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
    seeMore: {
        color: '#007BFF',
        fontSize: 14,
    },
    featuredCard: {
        width: width * 0.7,
        marginRight: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        overflow: 'hidden',
    },
    featuredImage: {
        width: '100%',
        height: 160,
        backgroundColor: '#f0f0f0',
    },
    featuredTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 12,
        paddingBottom: 4,
    },
    featuredSubtitle: {
        fontSize: 14,
        color: '#666',
        padding: 12,
        paddingTop: 0,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    categoryCard: {
        width: (width - 48) / 2,
        height: 120,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        justifyContent: 'space-between',
    },
    categoryTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
