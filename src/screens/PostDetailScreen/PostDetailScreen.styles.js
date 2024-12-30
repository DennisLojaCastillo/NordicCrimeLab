import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 80,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        marginBottom: 20,
    },
    postTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    postContent: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
    },
    commentProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentDetails: {
        flex: 1,
    },
    commentAuthor: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentContent: {
        fontSize: 14,
        color: '#555',
    },
    editedText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 5,
    },
    optionsButton: {
        marginLeft: 10,
    },
    noCommentsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    modal: {
        justifyContent: 'center',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    modalInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
        height: 100,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
