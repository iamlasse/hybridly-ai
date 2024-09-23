/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import useSecurity from '@/composables/security';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { user, authenticated } = useSecurity();
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center bg-slate-100 p-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    var __VLS_0 = {};
    if (__VLS_ctx.authenticated) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2") }, });
        const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ href: ((__VLS_ctx.route('dashboard'))), }));
        const __VLS_3 = __VLS_2({ href: ((__VLS_ctx.route('dashboard'))), }, ...__VLS_functionalComponentArgsRest(__VLS_2));
        __VLS_nonNullable(__VLS_6.slots).default;
        const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
        const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ method: ("post"), href: ((__VLS_ctx.route('logout'))), size: ("md"), variant: ("link"), }));
        const __VLS_9 = __VLS_8({ method: ("post"), href: ((__VLS_ctx.route('logout'))), size: ("md"), variant: ("link"), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        __VLS_nonNullable(__VLS_12.slots).default;
        const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-2") }, });
        const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ href: ((__VLS_ctx.route('login'))), }));
        const __VLS_15 = __VLS_14({ href: ((__VLS_ctx.route('login'))), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        __VLS_nonNullable(__VLS_18.slots).default;
        const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
    }
    var __VLS_19 = {};
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['bg-slate-100'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            authenticated: authenticated,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default {};
;
//# sourceMappingURL=main.vue.js.map