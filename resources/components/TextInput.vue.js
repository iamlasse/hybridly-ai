/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { onMounted, ref } from 'vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const model = defineModel({ required: true });
const input = ref(null);
onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});
const __VLS_exposed = { focus: () => input.value?.focus() };
defineExpose({ focus: () => input.value?.focus() });
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
;
let __VLS_functionalComponentProps;
const __VLS_defaults = {};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ class: ("border-gray-300 dark:border-gray-700 text-gray-800 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm") }, ref: ("input"), });
    (__VLS_ctx.model);
    // @ts-ignore navigation for `const input = ref()`
    __VLS_ctx.input;
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['dark:border-gray-700'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['dark:bg-gray-900'];
    __VLS_styleScopedClasses['dark:text-gray-300'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['dark:focus:border-indigo-600'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['dark:focus:ring-indigo-600'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-sm'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "input": __VLS_nativeElements['input'],
    };
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
            model: model,
            input: input,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
;
//# sourceMappingURL=TextInput.vue.js.map