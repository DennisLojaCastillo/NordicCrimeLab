import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    unreadNotification: {
        backgroundColor: '#f0f9ff',
    },
    noNotifications: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    timeText: {
        fontSize: 12,
        color: '#666',
        marginRight: 10,
        alignSelf: 'center'
    }
}); 