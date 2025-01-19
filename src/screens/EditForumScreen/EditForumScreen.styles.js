import { StyleSheet, Platform } from 'react-native';

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
};

export { colors };

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
    },
    saveButton: {
        color: colors.darkGray,
        fontSize: 16,
        fontWeight: '600',
    },
    formContainer: {
        padding: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: colors.textGray,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: colors.lightGray,
        color: colors.textGray,
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    categorySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        backgroundColor: colors.lightGray,
    },
    categorySelectorText: {
        fontSize: 16,
        color: colors.textGray,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
    },
    closeButton: {
        padding: 4,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    categoryItemText: {
        fontSize: 16,
        color: colors.textGray,
    },
}); 