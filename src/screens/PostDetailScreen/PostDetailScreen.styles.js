import { StyleSheet, Platform, StatusBar } from 'react-native';

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
        padding: 8,
    },
    contentContainer: {
        padding: 15,
        paddingBottom: 10,
    },
    postTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    postContent: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666',
        marginBottom: 15,
    },
    commentSection: {
        flex: 1,
        marginTop: 5,
    },
    commentCard: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
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
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    commentContent: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    editedText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 5,
    },
    optionsButton: {
        padding: 8,
    },
    noCommentsText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    // Modal styles
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'top',
        height: 120,
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Comment input container
    addCommentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        marginRight: 10,
    },
    addCommentButton: {
        backgroundColor: '#007BFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    addCommentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 10,
        marginHorizontal: 15,
    },
});
