import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    post: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    postContent: {
        fontSize: 14,
        color: '#666',
    },
    noPostsText: {
        fontSize: 16,
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
    },
});
