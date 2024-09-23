/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const __VLS_props = defineProps({
    collaborators: {
        type: Array,
        required: true,
    },
});
const randomBackground = () => {
    const colors = [
        'ffd6d6',
        'fff2cc',
        'ccf2ff',
        'ffe6ff',
        'cce0ff',
        'e6d9ff',
        'd9f7e6',
        'ffd6d6',
        'ffe6ff',
        'cce0ff',
        'e6d9ff',
        'd9f7e6',
        'fff2cc',
        'ccf2ff',
        'ffd6d6',
    ];
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};
const getDarkerBorderColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.slice(0, 2), 16);
    const g = parseInt(backgroundColor.slice(2, 4), 16);
    const b = parseInt(backgroundColor.slice(4, 6), 16);
    const darkerR = Math.max(0, r - 40).toString(16).padStart(2, '0');
    const darkerG = Math.max(0, g - 40).toString(16).padStart(2, '0');
    const darkerB = Math.max(0, b - 40).toString(16).padStart(2, '0');
    return `#${darkerR}${darkerG}${darkerB}`;
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        collaborators: {
            type: Array,
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap items-center gap-3") }, });
    for (const [collaborator] of __VLS_getVForSourceType((__VLS_ctx.collaborators))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((collaborator.id)), ...{ class: ("-m-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ((collaborator.avatar ?? `https://ui-avatars.com/api/?name=${collaborator.name}&background=${__VLS_ctx.randomBackground()}`)), alt: ((collaborator.name)), ...{ class: ("w-8 h-8 rounded-full border-2 shadow-md") }, ...{ style: (({ borderColor: __VLS_ctx.getDarkerBorderColor(__VLS_ctx.randomBackground()) })) }, title: ((collaborator.name)), });
    }
    var __VLS_0 = {};
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['gap-3'];
    __VLS_styleScopedClasses['-m-3'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['border-2'];
    __VLS_styleScopedClasses['shadow-md'];
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
            $props: __VLS_makeOptional(__VLS_props),
            ...__VLS_props,
            randomBackground: randomBackground,
            getDarkerBorderColor: getDarkerBorderColor,
        };
    },
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(__VLS_props),
            ...__VLS_props,
        };
    },
});
export default {};
;
//# sourceMappingURL=TeamMembers.vue.js.map