import { StyleSheet, Platform } from 'react-native';

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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    profileInfo: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    aboutText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 32,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007BFF',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    forumList: {
        flex: 1,
        paddingHorizontal: 16,
    },
    forumListContent: {
        padding: 16,
    },
    forumCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    forumContent: {
        padding: 16,
        minHeight: 100,
        borderRadius: 12,
    },
    forumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    categoryTag: {
        fontSize: 12,
        color: '#333',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 32,
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
        backgroundColor: '#fff',
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
});
