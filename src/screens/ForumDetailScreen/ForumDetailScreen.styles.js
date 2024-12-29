import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 80,
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
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    deleteButton: {
        padding: 10,
    },
    joinContainer: {
        alignItems: 'center',
    },
    joinText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
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
    category: {
        fontSize: 14,
        marginBottom: 20,
        color: '#333',
    },
    postCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
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
    postComments: {
        fontSize: 14,
        color: '#888',
    },
    emptyState: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    createPostButton: {
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: [{ translateX: -50 }],
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        backgroundColor: '#007BFF',
    },
    createPostButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
