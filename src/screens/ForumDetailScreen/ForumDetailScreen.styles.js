import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        marginRight: 10,
    },
    deleteButton: {
        padding: 10,
    },
    joinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    joinText: {
        fontSize: 14,
        color: '#666',
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#666',
    },
    categoryContainer: {
        backgroundColor: '#e3f2fd',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    category: {
        fontSize: 14,
        color: '#1976d2',
        fontWeight: '600',
    },
    postCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 20,
        elevation: 2,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postUser: {
        fontSize: 14,
        color: '#555',
    },
    postMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    postStatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatText: {
        marginLeft: 4,
        color: '#666',
        fontSize: 14,
    },
    emptyState: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    createPostButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalText: {
        fontSize: 16,
        color: '#007BFF',
        textAlign: 'center',
    },
    deleteItem: {
        borderBottomWidth: 0,
    },
    deleteText: {
        color: '#ff4444',
    },
});
