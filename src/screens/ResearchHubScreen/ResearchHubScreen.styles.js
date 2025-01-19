import { StyleSheet } from 'react-native';

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
};

// Kategori farver
const categoryColors = {
    'Forensic Science': colors.darkGray,
    'Digital Forensics': colors.textGray,
    'Behavioral Analysis': colors.iconGray,
    'Crime Scene Investigation': colors.darkGray,
    'Evidence Analysis': colors.textGray,
    'General': colors.iconGray,
};

export { colors, categoryColors };

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    searchContainer: {
        padding: 16,
    },
    searchBar: {
        borderRadius: 10,
        elevation: 0,
        backgroundColor: colors.lightGray,
    },
    searchInput: {
        fontSize: 16,
        color: colors.textGray,
    },
    section: {
        padding: 16,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.darkGray,
    },
    researchCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: colors.darkGray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    researchContent: {
        padding: 16,
    },
    researchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 8,
    },
    abstract: {
        fontSize: 14,
        color: colors.white,
        opacity: 0.9,
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryTag: {
        fontSize: 12,
        color: colors.white,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        color: colors.white,
        marginLeft: 4,
        marginRight: 12,
        fontSize: 14,
    },
}); 