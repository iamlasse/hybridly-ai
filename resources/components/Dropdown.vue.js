/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { computed, onMounted, onUnmounted, ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = withDefaults(defineProps(), {
    align: 'right',
    width: '48',
    contentClasses: 'py-1 bg-white dark:bg-gray-700',
});
const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};
onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));
const widthClass = computed(() => {
    return {
        48: 'w-48',
    }[props.width.toString()];
});
const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'ltr:origin-top-left rtl:origin-top-right start-0';
    }
    else if (props.align === 'right') {
        return 'ltr:origin-top-right rtl:origin-top-left end-0';
    }
    else {
        return 'origin-top';
    }
});
const open = ref(false);
const __VLS_withDefaultsArg = (function (t) { return t; })({
    align: 'right',
    width: '48',
    contentClasses: 'py-1 bg-white dark:bg-gray-700',
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.open = !__VLS_ctx.open;
            } }, });
    var __VLS_0 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.open = false;
            } }, ...{ class: ("fixed inset-0 z-40") }, });
    __VLS_directiveAsFunction(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.open) }, null, null);
    const __VLS_1 = __VLS_resolvedLocalAndGlobalComponents.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */
    // @ts-ignore
    const __VLS_2 = __VLS_asFunctionalComponent(__VLS_1, new __VLS_1({ enterActiveClass: ("transition ease-out duration-200"), enterFromClass: ("opacity-0 scale-95"), enterToClass: ("opacity-100 scale-100"), leaveActiveClass: ("transition ease-in duration-75"), leaveFromClass: ("opacity-100 scale-100"), leaveToClass: ("opacity-0 scale-95"), persisted: (true), }));
    const __VLS_3 = __VLS_2({ enterActiveClass: ("transition ease-out duration-200"), enterFromClass: ("opacity-0 scale-95"), enterToClass: ("opacity-100 scale-100"), leaveActiveClass: ("transition ease-in duration-75"), leaveFromClass: ("opacity-100 scale-100"), leaveToClass: ("opacity-0 scale-95"), persisted: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_2));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.open = false;
            } }, ...{ class: ("absolute z-50 mt-2 rounded-md shadow-lg") }, ...{ class: (([__VLS_ctx.widthClass, __VLS_ctx.alignmentClasses])) }, ...{ style: ({}) }, });
    __VLS_directiveAsFunction(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.open) }, null, null);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("rounded-md ring-1 ring-black ring-opacity-5") }, ...{ class: ((__VLS_ctx.contentClasses)) }, });
    var __VLS_7 = {};
    __VLS_nonNullable(__VLS_6.slots).default;
    const __VLS_6 = __VLS_pickFunctionalComponentCtx(__VLS_1, __VLS_3);
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['z-40'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['ring-1'];
    __VLS_styleScopedClasses['ring-black'];
    __VLS_styleScopedClasses['ring-opacity-5'];
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
            widthClass: widthClass,
            alignmentClasses: alignmentClasses,
            open: open,
        };
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
;
//# sourceMappingURL=Dropdown.vue.js.map