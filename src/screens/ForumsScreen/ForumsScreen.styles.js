import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 80,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {                
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,        
        textAlign: 'center',
    },
    forumCard: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        elevation: 2,
    },
    forumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    forumCategory: {
        fontSize: 14,
        color: '#666',
    },
});
