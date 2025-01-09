import { StyleSheet, Platform, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: '#333',
    },
    formContainer: {
        padding: 16,
    },
    input: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    categorySelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    categorySelectorText: {
        fontSize: 16,
        color: '#333',
    },
    categorySelectorPlaceholder: {
        color: '#666',
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    picker: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        ...Platform.select({
            ios: {
                height: 150,
            },
            android: {
                height: 50,
            },
        }),
    },
    submitButton: {
        backgroundColor: '#007BFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    newCategoryContainer: {
        padding: 16,
        paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    },
    newCategoryInput: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
    },
    newCategoryButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    newCategoryButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
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
        fontWeight: '600',
    },
    createButtonText: {
        color: '#fff',
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
        color: '#007BFF',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
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
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 8,
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
        borderBottomColor: '#eee',
    },
    categoryItemText: {
        fontSize: 16,
        color: '#333',
    },
    modalFooter: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Extra padding for home indicator
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 16,
    },
});
