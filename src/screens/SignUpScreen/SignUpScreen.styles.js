import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
    },
    aboutInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    imageButton: {
        marginBottom: 10,
    },
    imageButtonText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 12, // Giver luft mellem knapper
    },
    buttonCreate: {
        backgroundColor: '#118B50',
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 12, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navigationButtons: {
        width: '100%', // Sørger for at knapper fylder hele bredden
        marginTop: 20,
    },
    imageWrapper: {
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: '5%',        
        backgroundColor: '#007BFF',
        borderRadius: 20,
        padding: 5,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        padding: 10,
        width: '48%',
    },
    socialButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
    },
    loginLink: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    countryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    countryText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeholderText: {
        color: '#999',
    },
    inputText: {
        color: '#000',
    },
    loadingText: {
        textAlign: 'center',
        padding: 20,
        color: '#666',
    },
});

export default styles;
