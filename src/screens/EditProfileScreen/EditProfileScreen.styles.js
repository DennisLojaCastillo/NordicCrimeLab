import { StyleSheet } from 'react-native';

// Genbruger farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
    error: '#ff4444',       // Rød til sletning/fejl
    primary: '#000',     // Primær blå farve
};

export { colors };

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textGray,
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
        color: colors.primary,
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 16,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.lightGray,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 10,
    },
    saveButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: colors.error,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 10,
    },
    deleteButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: -10,
        marginBottom: 10,
        marginLeft: 5,
    }
});
