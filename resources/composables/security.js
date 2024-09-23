export default function useSecurity() {
    const user = useProperty('security.user');
    const authenticated = computed(() => !!user.value);
    return {
        user,
        authenticated,
    };
}
//# sourceMappingURL=security.js.map