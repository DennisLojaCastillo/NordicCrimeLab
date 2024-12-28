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
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
});

export default styles;
