import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 52,
        color: '#333',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10,
    },
    changePhotoText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;
