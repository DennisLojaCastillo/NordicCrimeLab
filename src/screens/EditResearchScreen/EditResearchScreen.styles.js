import { StyleSheet, Platform } from 'react-native';

// Genbruger farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
    error: '#ff4444',       // Rød til sletning/fejl
    primary: '#000',     // Primær blå farve til knapper
};

export { colors };

// Genbruger styles fra CreateResearchScreen med få ændringer
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
        paddingTop: Platform.OS === 'android' ? 16 : 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray,
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
    abstractInput: {
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 20,
        borderRadius: 12,
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
    categoryList: {
        maxHeight: 300,
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
    },
    addCategoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
    },
    addCategoryText: {
        marginLeft: 8,
        fontSize: 16,
        color: colors.primary,
    },
    newCategoryContainer: {
        padding: 16,
    },
    newCategoryInput: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: colors.lightGray,
    },
    newCategoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newCategoryButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        marginRight: 8,
        backgroundColor: colors.lightGray,
    },
    createButton: {
        marginLeft: 8,
        backgroundColor: colors.primary,
    },
    cancelButtonText: {
        color: colors.textGray,
        fontSize: 16,
    },
    createButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    imagesSection: {
        marginTop: 16,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
    },
    imageContainer: {
        width: '33.33%',
        padding: 8,
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
    },
    deleteImageButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: colors.white,
        borderRadius: 12,
    },
    addImageButton: {
        width: '33.33%',
        padding: 4,
        borderWidth: 1,
        borderColor: colors.darkGray,
        borderStyle: 'dashed',
        borderRadius: 12,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
    },
    addImageText: {
        color: colors.darkGray,
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
    },
}); 