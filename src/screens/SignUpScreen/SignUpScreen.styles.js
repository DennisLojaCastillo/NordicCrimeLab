import { StyleSheet } from 'react-native';

// Genbruger farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
    error: '#ff4444',       // Rød til sletning/fejl
    primary: '#000',        // Sort som primær farve
    success: '#118B50',     // Grøn til "Create" knap
};

export { colors };

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.white,
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
        color: colors.textGray,
    },
    input: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: colors.lightGray,
        color: colors.textGray,
        justifyContent: 'center',
    },
    aboutInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    imageWrapper: {
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.primary,
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
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 5,
    },
    button: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 12,
    },
    buttonCreate: {
        backgroundColor: colors.success,
        width: '100%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 12,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
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
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: 12,
        width: '48%',
    },
    socialButtonText: {
        marginLeft: 8,
        fontSize: 14,
        color: colors.textGray,
    },
    subtitle: {
        fontSize: 14,
        color: colors.iconGray,
        marginBottom: 20,
        textAlign: 'center',
    },
    loginText: {
        fontSize: 14,
        color: colors.iconGray,
        marginTop: 20,
        textAlign: 'center',
    },
    loginLink: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
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
        color: colors.textGray,
    },
    countryItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    countryText: {
        fontSize: 16,
        color: colors.textGray,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    placeholderText: {
        color: colors.iconGray,
    },
    inputText: {
        color: colors.textGray,
    },
    loadingText: {
        textAlign: 'center',
        padding: 20,
        color: colors.iconGray,
    },
    navigationButtons: {
        width: '100%',
        marginTop: 20,
    },
});
