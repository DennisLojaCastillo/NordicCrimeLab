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
};

export { colors };

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textGray,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.iconGray,
        marginBottom: 24,
        textAlign: 'center',
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
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        color: colors.primary,
        fontSize: 14,
        marginBottom: 24,
    },
    loginButton: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupText: {
        fontSize: 14,
        color: colors.iconGray,
    },
    signupLink: {
        color: colors.primary,
        fontWeight: 'bold',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
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
});
