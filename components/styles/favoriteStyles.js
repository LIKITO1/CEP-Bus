import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8FF',
    },
    header: {
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
        marginTop: 3,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
        paddingTop: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyIconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: '#94A3B8',
        fontWeight: '500',
        textAlign: 'center',
        maxWidth: 250,
        lineHeight: 22,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 18,
        marginBottom: 14,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    starCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFBEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cepBadge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 10,
    },
    cepText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#3B82F6',
        letterSpacing: 0.5,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapBtn: {
        backgroundColor: '#EFF6FF',
    },
    deleteBtn: {
        backgroundColor: '#FEF2F2',
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 12,
    },
    logradouro: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 10,
        lineHeight: 22,
    },
    infoRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'flex-end',
    },
    infoItem: {
        gap: 3,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 0.7,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
    },
    ufBadge: {
        backgroundColor: '#4984d1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 9,
    },
    ufText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 13,
    },
})
