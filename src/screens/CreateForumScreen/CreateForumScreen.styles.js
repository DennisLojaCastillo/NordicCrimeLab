import { StyleSheet, Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

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
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'android' ? 16 : 8,
        marginTop: Platform.OS === 'android' ? 30 : 0,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    formContainer: {
        padding: 16,
    },
    input: {
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        color: colors.textGray,
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    categorySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    categorySelectorText: {
        fontSize: 16,
        color: colors.textGray,
    },
    categorySelectorPlaceholder: {
        color: colors.textGray,
        opacity: 0.6,
    },
    submitButton: {
        backgroundColor: colors.darkGray,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 0,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    categoryList: {
        maxHeight: height * 0.5,
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
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textGray,
        marginBottom: 8,
        marginTop: 16,
    },
    // Nye kategori styles
    newCategoryContainer: {
        padding: 16,
    },
    newCategoryInput: {
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: colors.textGray,
    },
    newCategoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.lightGray,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    createButton: {
        flex: 1,
        backgroundColor: colors.darkGray,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: colors.textGray,
        fontSize: 16,
        fontWeight: '600',
    },
    createButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    addCategoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    addCategoryText: {
        color: colors.darkGray,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
});
