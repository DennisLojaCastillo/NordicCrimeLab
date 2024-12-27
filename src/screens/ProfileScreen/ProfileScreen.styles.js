import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    memberSince: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    logoutButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        backgroundColor: '#FF4500',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tabButton: {
        padding: 10,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#FF4500',
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
});
