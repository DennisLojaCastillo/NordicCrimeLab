import { StyleSheet } from 'react-native';

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
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    formContainer: {
        padding: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
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
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    categorySelectorText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
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
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
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
        borderBottomColor: '#eee',
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
        borderTopColor: '#eee',
    },
    addCategoryText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#007BFF',
    },
    newCategoryContainer: {
        padding: 16,
    },
    newCategoryInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
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
        backgroundColor: '#f8f9fa',
    },
    createButton: {
        marginLeft: 8,
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
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: {
        color: '#fff',
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
        backgroundColor: 'white',
        borderRadius: 12,
    },
    addImageButton: {
        width: '33.33%',
        padding: 8,
    },
    addImageContent: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageText: {
        marginTop: 8,
        color: '#007BFF',
        textAlign: 'center',
    },
}); 