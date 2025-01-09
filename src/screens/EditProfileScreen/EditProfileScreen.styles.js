import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        padding: 8,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginTop: 20,
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
        marginHorizontal: 16,
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
        marginHorizontal: 16,
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
        marginHorizontal: 16,
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
    }
});

export default styles;
