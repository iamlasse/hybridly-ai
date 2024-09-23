/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const isOpen = defineModel({ default: false, required: true });
const { show, close, unmount } = useDialog();
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
;
let __VLS_functionalComponentProps;
const __VLS_defaults = {
    modelValue: false,
};
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
    __VLS_styleScopedClasses['animate__animated'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Dialog;
    /** @type { [typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.isOpen)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onUpdate:open': {} }, open: ((__VLS_ctx.isOpen)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        'onUpdate:open': (__VLS_ctx.close)
    };
    let __VLS_3;
    let __VLS_4;
    const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.DialogContent;
    /** @type { [typeof __VLS_components.DialogContent, typeof __VLS_components.DialogContent, ] } */
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onAfterLeave': {} }, ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, }));
    const __VLS_10 = __VLS_9({ ...{ 'onAfterLeave': {} }, ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_14;
    const __VLS_15 = {
        onAfterLeave: (__VLS_ctx.unmount)
    };
    const __VLS_16 = {
        onInteractOutside: (__VLS_ctx.close)
    };
    const __VLS_17 = {
        onEscapeKeyDown: (__VLS_ctx.close)
    };
    const __VLS_18 = {
        onPointerDownOutside: (__VLS_ctx.close)
    };
    let __VLS_11;
    let __VLS_12;
    const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.DialogHeader;
    /** @type { [typeof __VLS_components.DialogHeader, typeof __VLS_components.DialogHeader, ] } */
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({ ...{ class: ("p-0") }, }));
    const __VLS_21 = __VLS_20({ ...{ class: ("p-0") }, }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.DialogTitle;
    /** @type { [typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ] } */
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    var __VLS_31 = {};
    __VLS_nonNullable(__VLS_30.slots).default;
    const __VLS_30 = __VLS_pickFunctionalComponentCtx(__VLS_25, __VLS_27);
    const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.DialogDescription;
    /** @type { [typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ] } */
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
    const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
    var __VLS_38 = {};
    __VLS_nonNullable(__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    __VLS_nonNullable(__VLS_24.slots).default;
    const __VLS_24 = __VLS_pickFunctionalComponentCtx(__VLS_19, __VLS_21);
    var __VLS_39 = {
        close: ((__VLS_ctx.close)),
    };
    const __VLS_40 = __VLS_resolvedLocalAndGlobalComponents.DialogFooter;
    /** @type { [typeof __VLS_components.DialogFooter, typeof __VLS_components.DialogFooter, ] } */
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    var __VLS_46 = {};
    __VLS_nonNullable(__VLS_45.slots).default;
    const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
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
            Dialog: Dialog,
            DialogContent: DialogContent,
            DialogDescription: DialogDescription,
            DialogFooter: DialogFooter,
            DialogHeader: DialogHeader,
            DialogTitle: DialogTitle,
            isOpen: isOpen,
            close: close,
            unmount: unmount,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=Modal.vue.js.map