import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    greetingContainer: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
