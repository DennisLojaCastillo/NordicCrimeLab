import { StyleSheet, Platform, StatusBar } from 'react-native';

// Definerer farvepaletten
const colors = {
    darkGray: '#1A1A1A',    // Næsten sort
    textGray: '#333333',    // Mørkegrå til tekst
    iconGray: '#2A2A2A',    // Mørkegrå til ikoner
    lightGray: '#f5f5f5',   // Lysegrå til baggrunde
    white: '#fff',
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
        padding: 8,
    },
    contentContainer: {
        padding: 20,
    },
    forumTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.darkGray,
    },
    forumCategory: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textGray,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
        backgroundColor: colors.lightGray,
        color: colors.textGray,
    },
    contentInput: {
        height: 150,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    createButton: {
        backgroundColor: colors.darkGray,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: colors.darkGray,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    createButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryContainer: {
        backgroundColor: colors.darkGray,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    categoryText: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600',
    },
});
