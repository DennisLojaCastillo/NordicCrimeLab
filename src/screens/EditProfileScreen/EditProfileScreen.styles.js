import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 16,
    },
    imageButton: {
        alignSelf: 'center',
        marginBottom: 16,
    },
    imageButtonText: {
        color: '#007BFF',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    deleteButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
