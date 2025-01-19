import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
};

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
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    section: {
        padding: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    seeMore: {
        color: colors.darkGray,
        fontSize: 14,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    researchCard: {
        width: width * 0.7,
        marginRight: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    researchImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
    },
    researchContent: {
        padding: 12,
    },
    researchTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    researchMeta: {
        fontSize: 14,
        color: '#666',
    },
    forumCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    forumIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.darkGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    forumContent: {
        flex: 1,
    },
    forumTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    forumMeta: {
        fontSize: 14,
        color: '#666',
    },
});
