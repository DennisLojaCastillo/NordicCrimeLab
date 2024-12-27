import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    forumItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    forumName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    forumDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});
