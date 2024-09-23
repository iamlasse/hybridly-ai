/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { ref } from "vue";
import PrimaryButton from "../components/PrimaryButton.vue";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const user = useProperty("security.user");
const showCreateProjectModal = ref(false);
const openCreateProjectModal = () => {
    showCreateProjectModal.value = true;
};
const closeCreateProjectModal = () => {
    showCreateProjectModal.value = false;
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
    if (!__VLS_ctx.user?.is_premium) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 my-6 mx-4 rounded-lg shadow-sm") }, role: ("alert"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ href: ((__VLS_ctx.route('upgrade.show'))), ...{ class: ("font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200") }, }));
        const __VLS_2 = __VLS_1({ href: ((__VLS_ctx.route('upgrade.show'))), ...{ class: ("font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_nonNullable(__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 flex justify-between items-center mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-2xl font-semibold") }, });
    // @ts-ignore
    [PrimaryButton, PrimaryButton,];
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(PrimaryButton, new PrimaryButton({ ...{ 'onClick': {} }, ...{ class: ("disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-500 disabled:bg-slate-500") }, disabled: ((!__VLS_ctx.canCreateMoreProjects)), }));
    const __VLS_7 = __VLS_6({ ...{ 'onClick': {} }, ...{ class: ("disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-500 disabled:bg-slate-500") }, disabled: ((!__VLS_ctx.canCreateMoreProjects)), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_11;
    const __VLS_12 = {
        onClick: (__VLS_ctx.openCreateProjectModal)
    };
    let __VLS_8;
    let __VLS_9;
    __VLS_nonNullable(__VLS_10.slots).default;
    const __VLS_10 = __VLS_pickFunctionalComponentCtx(PrimaryButton, __VLS_7);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 flex flex-col gap-6") }, });
    const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.ProjectList;
    /** @type { [typeof __VLS_components.ProjectList, ] } */
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ projects: ((__VLS_ctx.projects.data)), }));
    const __VLS_15 = __VLS_14({ projects: ((__VLS_ctx.projects.data)), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.ProjectList;
    /** @type { [typeof __VLS_components.ProjectList, typeof __VLS_components.ProjectList, ] } */
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ projects: ((__VLS_ctx.collaborating_projects.data)), }));
    const __VLS_21 = __VLS_20({ projects: ((__VLS_ctx.collaborating_projects.data)), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_24.slots);
    }
    const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
    const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.CreateProjectModal;
    /** @type { [typeof __VLS_components.CreateProjectModal, ] } */
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({ ...{ 'onClose': {} }, modelValue: ((__VLS_ctx.showCreateProjectModal)), }));
    const __VLS_27 = __VLS_26({ ...{ 'onClose': {} }, modelValue: ((__VLS_ctx.showCreateProjectModal)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_31;
    const __VLS_32 = {
        onClose: (__VLS_ctx.closeCreateProjectModal)
    };
    let __VLS_28;
    let __VLS_29;
    const __VLS_30 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
    __VLS_styleScopedClasses['bg-yellow-50'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-yellow-200'];
    __VLS_styleScopedClasses['text-yellow-800'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['my-6'];
    __VLS_styleScopedClasses['mx-4'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-yellow-700'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['hover:text-yellow-800'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['disabled:opacity-50'];
    __VLS_styleScopedClasses['disabled:cursor-not-allowed'];
    __VLS_styleScopedClasses['disabled:hover:bg-slate-500'];
    __VLS_styleScopedClasses['disabled:bg-slate-500'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-6'];
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
            PrimaryButton: PrimaryButton,
            user: user,
            showCreateProjectModal: showCreateProjectModal,
            openCreateProjectModal: openCreateProjectModal,
            closeCreateProjectModal: closeCreateProjectModal,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
//# sourceMappingURL=dashboard.vue.js.map