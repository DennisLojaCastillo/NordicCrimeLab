import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 70,
        backgroundColor: '#fff',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
        marginLeft: 20,
    },
    profileInfo: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginBottom: 10,        
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    aboutText: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    forumsContainer: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    forumCard: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    forumTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalItem: {
        paddingVertical: 15,
    },
    modalText: {
        fontSize: 18,
        color: '#007BFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
});
