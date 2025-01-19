import { StyleSheet, Platform, Dimensions, StatusBar } from 'react-native';
const { width } = Dimensions.get('window');

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
    error: '#ff4444',       // Rød til sletning/fejl
};

export { colors };

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    backButton: {
        marginRight: 10,
    },
    joinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    joinText: {
        fontSize: 14,
        color: colors.textGray,
    },
    contentContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkGray,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.textGray,
    },
    categoryContainer: {
        backgroundColor: colors.darkGray,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    category: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
    },
    postCard: {
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        marginBottom: 10,
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.darkGray,
        marginBottom: 5,
    },
    postUser: {
        fontSize: 14,
        color: colors.textGray,
    },
    postMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    postStatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postStatText: {
        marginLeft: 4,
        color: colors.textGray,
        fontSize: 14,
    },
    emptyState: {
        fontSize: 16,
        color: colors.textGray,
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 20,
    },
    createPostButton: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.darkGray,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    modalText: {
        fontSize: 16,
        color: colors.darkGray,
        textAlign: 'center',
    },
    deleteItem: {
        borderBottomWidth: 0,
    },
    deleteText: {
        color: colors.error,
    },
});
