import { Sheet, SheetContent, } from '@/components/ui/sheet';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { show, close, unmount } = useDialog();
const handleAfterLeave = () => {
    console.log('after leave');
    unmount();
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Sheet;
    /** @type { [typeof __VLS_components.Sheet, typeof __VLS_components.Sheet, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.show)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.show)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        'onUpdate:open': (__VLS_ctx.close)
    };
    let __VLS_3;
    let __VLS_4;
    const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.SheetContent;
    /** @type { [typeof __VLS_components.SheetContent, typeof __VLS_components.SheetContent, ] } */
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, ...{ 'onAfterLeave': {} }, ...{ class: ("p-0") }, }));
    const __VLS_10 = __VLS_9({ ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, ...{ 'onAfterLeave': {} }, ...{ class: ("p-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_14;
    const __VLS_15 = {
        onInteractOutside: (__VLS_ctx.close)
    };
    const __VLS_16 = {
        onEscapeKeyDown: (__VLS_ctx.close)
    };
    const __VLS_17 = {
        onPointerDownOutside: (__VLS_ctx.close)
    };
    const __VLS_18 = {
        onAfterLeave: (__VLS_ctx.handleAfterLeave)
    };
    let __VLS_11;
    let __VLS_12;
    var __VLS_19 = {
        close: ((__VLS_ctx.close)),
    };
    __VLS_nonNullable(__VLS_13.slots).default;
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['p-0'];
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
            Sheet: Sheet,
            SheetContent: SheetContent,
            show: show,
            close: close,
            handleAfterLeave: handleAfterLeave,
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
//# sourceMappingURL=sdialog.vue.js.map