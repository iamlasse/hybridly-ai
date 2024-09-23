/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { Link } from '@inertiajs/vue3';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-bold mb-2") }, });
    (__VLS_ctx.project.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.project.description);
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Link;
    /** @type { [typeof __VLS_components.Link, typeof __VLS_components.Link, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ href: (('/projects/' + __VLS_ctx.project.id)), ...{ class: ("underline text-blue-500") }, }));
    const __VLS_2 = __VLS_1({ href: (('/projects/' + __VLS_ctx.project.id)), ...{ class: ("underline text-blue-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['sm:w-1/2'];
    __VLS_styleScopedClasses['md:w-1/3'];
    __VLS_styleScopedClasses['lg:w-1/4'];
    __VLS_styleScopedClasses['xl:w-1/5'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['text-blue-500'];
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
            Link: Link,
        };
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
});
;
//# sourceMappingURL=ProjectCard.vue.js.map