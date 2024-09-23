const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const projectClass = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-500';
        case 'pending':
            return 'bg-yellow-500';
        case 'completed':
            return 'bg-pink-500';
        case 'on_hold':
            return 'bg-slate-500';
        default:
            return 'bg-blue-500';
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("mb-4 text-2xl font-bold text-white dark:text-white") }, });
    var __VLS_0 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("flex gap-2 flex-wrap") }, });
    for (const [project, index] of __VLS_getVForSourceType((__VLS_ctx.projects.data))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((index)), ...{ class: ("bg-white block dark:bg-gray-800 rounded-lg shadow-md flex-shrink-0 flex-1 min-w-80 max-w-80 transition-transform duration-300") }, });
        const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ href: ((`/projects/${project.id}`)), ...{ class: ("flex flex-col h-full ") }, }));
        const __VLS_3 = __VLS_2({ href: ((`/projects/${project.id}`)), ...{ class: ("flex flex-col h-full ") }, }, ...__VLS_functionalComponentArgsRest(__VLS_2));
        __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("bg-gradient-to-r from-gray-900 to-gray-500 p-4 rounded-t-lg flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-xl font-bold text-white truncate pr-3") }, });
        (project.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ((__VLS_ctx.projectClass(project.status))) }, ...{ class: ("rounded-full min-w-3 min-h-3 h-3 w-3 inline-block ring-gray-700 ring-4") }, "aria-label": ((`Project status: ${project.status}`)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-4 flex-1 flex flex-col justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3") }, });
        (project.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-sm font-semibold text-gray-700 dark:text-gray-300") }, });
        const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.VIcon;
        /** @type { [typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ] } */
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ name: ("fa-tasks"), scale: ("0.8"), ...{ class: ("inline mr-1") }, }));
        const __VLS_9 = __VLS_8({ name: ("fa-tasks"), scale: ("0.8"), ...{ class: ("inline mr-1") }, }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        (project.tasks_count);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xs text-blue-600 dark:text-blue-400 hover:underline") }, });
        __VLS_nonNullable(__VLS_6.slots).default;
        const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
    }
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['dark:text-white'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['dark:bg-gray-800'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['min-w-80'];
    __VLS_styleScopedClasses['max-w-80'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['bg-gradient-to-r'];
    __VLS_styleScopedClasses['from-gray-900'];
    __VLS_styleScopedClasses['to-gray-500'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded-t-lg'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['truncate'];
    __VLS_styleScopedClasses['pr-3'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['min-w-3'];
    __VLS_styleScopedClasses['min-h-3'];
    __VLS_styleScopedClasses['h-3'];
    __VLS_styleScopedClasses['w-3'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['ring-gray-700'];
    __VLS_styleScopedClasses['ring-4'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['line-clamp-3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['dark:text-gray-300'];
    __VLS_styleScopedClasses['inline'];
    __VLS_styleScopedClasses['mr-1'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-blue-600'];
    __VLS_styleScopedClasses['dark:text-blue-400'];
    __VLS_styleScopedClasses['hover:underline'];
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
            projectClass: projectClass,
        };
    },
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=ProjectList.vue.js.map