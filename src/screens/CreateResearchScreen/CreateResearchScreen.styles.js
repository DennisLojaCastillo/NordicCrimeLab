import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
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
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        padding: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    abstractInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    categorySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    categorySelectorText: {
        fontSize: 16,
        color: '#333',
    },
    categorySelectorPlaceholder: {
        color: '#999',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
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
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
        borderBottomColor: '#e0e0e0',
    },
    categoryItemText: {
        fontSize: 16,
        color: '#333',
    },
    modalFooter: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    addCategoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    addCategoryText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007BFF',
        fontWeight: '600',
    },
    newCategoryContainer: {
        padding: 16,
    },
    newCategoryInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    newCategoryButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    newCategoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 8,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    createButton: {
        backgroundColor: '#007BFF',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    attachmentsSection: {
        marginBottom: 16,
    },
    attachmentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        marginBottom: 8,
    },
    attachmentName: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#333',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#007BFF',
        borderRadius: 8,
        borderStyle: 'dashed',
    },
    uploadButtonText: {
        marginLeft: 8,
        color: '#007BFF',
        fontSize: 16,
    },
    imagesSection: {
        marginBottom: 16,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    imageContainer: {
        width: '33.33%',
        padding: 4,
        position: 'relative',
    },
    imagePreview: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
    },
    deleteImageButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 12,
        margin: 8,
    },
    addImageButton: {
        width: '33.33%',
        padding: 4,
    },
    addImageButtonContent: {
        borderWidth: 1,
        borderColor: '#007BFF',
        borderStyle: 'dashed',
        borderRadius: 8,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageText: {
        color: '#007BFF',
        marginTop: 4,
        fontSize: 12,
    },
}); 