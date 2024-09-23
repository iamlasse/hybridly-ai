/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { computed } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const emit = defineEmits(['update:checked']);
let __VLS_typeProps;
const props = defineProps();
const proxyChecked = computed({
    get() {
        return props.checked;
    },
    set(val) {
        emit('update:checked', val);
    },
});
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {},
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ type: ("checkbox"), value: ((__VLS_ctx.value)), ...{ class: ("rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800") }, });
    (__VLS_ctx.proxyChecked);
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['dark:bg-gray-900'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['dark:border-gray-700'];
    __VLS_styleScopedClasses['text-indigo-600'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['dark:focus:ring-indigo-600'];
    __VLS_styleScopedClasses['dark:focus:ring-offset-gray-800'];
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
            proxyChecked: proxyChecked,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
;
//# sourceMappingURL=Checkbox.vue.js.map