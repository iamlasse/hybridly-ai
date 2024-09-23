/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const $props = defineProps();
const $emit = defineEmits(['selectTask']);
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'todo':
            return 'bg-blue-100 text-blue-800';
        case 'in progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'done':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("h-full border rounded") }, ...{ class: (({ 'border-green-800': __VLS_ctx.selected })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.$emit('selectTask', __VLS_ctx.task);
            } }, ...{ class: ("task-card h-full flex flex-col border-l-6 bg-white text-gray-800 p-3 rounded shadow cursor-move") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("font-medium mb-2") }, });
    (__VLS_ctx.task.title);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-600 line-clamp-2") }, });
    (__VLS_ctx.task.description);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2 flex justify-between items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex gap-1 items-center") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.VIcon;
    /** @type { [typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, typeof __VLS_components.VIcon, typeof __VLS_components.vIcon, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ name: ("oi-comment-discussion"), ...{ class: ("text-gray-600") }, }));
    const __VLS_2 = __VLS_1({ name: ("oi-comment-discussion"), ...{ class: ("text-gray-600") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xs text-gray-600") }, });
    (__VLS_ctx.task.comments_count);
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['border-green-800'];
    __VLS_styleScopedClasses['task-card'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['border-l-6'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['p-3'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['cursor-move'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['flex-grow'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['line-clamp-2'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['gap-1'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-gray-600'];
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
            $emit: $emit,
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
//# sourceMappingURL=TaskCard.vue.js.map