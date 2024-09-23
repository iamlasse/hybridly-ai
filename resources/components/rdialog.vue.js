/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const { show, close, unmount } = useDialog();
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.DialogRoot;
    /** @type { [typeof __VLS_components.DialogRoot, typeof __VLS_components.dialogRoot, typeof __VLS_components.DialogRoot, typeof __VLS_components.dialogRoot, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ open: ((__VLS_ctx.show)), }));
    const __VLS_2 = __VLS_1({ open: ((__VLS_ctx.show)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.DialogPortal;
    /** @type { [typeof __VLS_components.DialogPortal, typeof __VLS_components.dialogPortal, typeof __VLS_components.DialogPortal, typeof __VLS_components.dialogPortal, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.DialogOverlay;
    /** @type { [typeof __VLS_components.DialogOverlay, typeof __VLS_components.dialogOverlay, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ class: ("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30") }, }));
    const __VLS_14 = __VLS_13({ ...{ class: ("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.DialogContent;
    /** @type { [typeof __VLS_components.DialogContent, typeof __VLS_components.dialogContent, typeof __VLS_components.DialogContent, typeof __VLS_components.dialogContent, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, ...{ 'onAfterLeave': {} }, "aria-describedby": ("sheet"), ...{ class: ("\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u002d\u0073\u0063\u0072\u0065\u0065\u006e\u0020\u0077\u002d\u0031\u002f\u0034\u0020\u0066\u0069\u0078\u0065\u0064\u0020\u0072\u0069\u0067\u0068\u0074\u002d\u0030\u0020\u0074\u006f\u0070\u002d\u0030\u0020\u007a\u002d\u0035\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u006f\u0070\u0065\u006e\u005d\u003a\u0061\u006e\u0069\u006d\u0061\u0074\u0065\u002d\u0069\u006e\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u0063\u006c\u006f\u0073\u0065\u0064\u005d\u003a\u0061\u006e\u0069\u006d\u0061\u0074\u0065\u002d\u006f\u0075\u0074\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u006f\u0070\u0065\u006e\u005d\u003a\u0073\u006c\u0069\u0064\u0065\u002d\u0069\u006e\u002d\u0066\u0072\u006f\u006d\u002d\u0072\u0069\u0067\u0068\u0074\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u0063\u006c\u006f\u0073\u0065\u0064\u005d\u003a\u0073\u006c\u0069\u0064\u0065\u002d\u006f\u0075\u0074\u002d\u0074\u006f\u002d\u0072\u0069\u0067\u0068\u0074") }, }));
    const __VLS_20 = __VLS_19({ ...{ 'onInteractOutside': {} }, ...{ 'onEscapeKeyDown': {} }, ...{ 'onPointerDownOutside': {} }, ...{ 'onAfterLeave': {} }, "aria-describedby": ("sheet"), ...{ class: ("\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0062\u0067\u002d\u0077\u0068\u0069\u0074\u0065\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u002d\u0073\u0063\u0072\u0065\u0065\u006e\u0020\u0077\u002d\u0031\u002f\u0034\u0020\u0066\u0069\u0078\u0065\u0064\u0020\u0072\u0069\u0067\u0068\u0074\u002d\u0030\u0020\u0074\u006f\u0070\u002d\u0030\u0020\u007a\u002d\u0035\u0030\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u006f\u0070\u0065\u006e\u005d\u003a\u0061\u006e\u0069\u006d\u0061\u0074\u0065\u002d\u0069\u006e\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u0063\u006c\u006f\u0073\u0065\u0064\u005d\u003a\u0061\u006e\u0069\u006d\u0061\u0074\u0065\u002d\u006f\u0075\u0074\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u006f\u0070\u0065\u006e\u005d\u003a\u0073\u006c\u0069\u0064\u0065\u002d\u0069\u006e\u002d\u0066\u0072\u006f\u006d\u002d\u0072\u0069\u0067\u0068\u0074\u0020\u0064\u0061\u0074\u0061\u002d\u005b\u0073\u0074\u0061\u0074\u0065\u003d\u0063\u006c\u006f\u0073\u0065\u0064\u005d\u003a\u0073\u006c\u0069\u0064\u0065\u002d\u006f\u0075\u0074\u002d\u0074\u006f\u002d\u0072\u0069\u0067\u0068\u0074") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_24;
    const __VLS_25 = {
        onInteractOutside: (__VLS_ctx.close)
    };
    const __VLS_26 = {
        onEscapeKeyDown: (__VLS_ctx.close)
    };
    const __VLS_27 = {
        onPointerDownOutside: (__VLS_ctx.close)
    };
    const __VLS_28 = {
        onAfterLeave: (__VLS_ctx.unmount)
    };
    let __VLS_21;
    let __VLS_22;
    const __VLS_29 = __VLS_resolvedLocalAndGlobalComponents.DialogTitle;
    /** @type { [typeof __VLS_components.DialogTitle, typeof __VLS_components.DialogTitle, ] } */
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({ asChild: (true), ...{ class: ("text-lg font-medium text-gray-900 flex items-center justify-between p-6") }, }));
    const __VLS_31 = __VLS_30({ asChild: (true), ...{ class: ("text-lg font-medium text-gray-900 flex items-center justify-between p-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
    var __VLS_35 = {};
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.DialogClose;
    /** @type { [typeof __VLS_components.DialogClose, typeof __VLS_components.DialogClose, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ asChild: (true), }));
    const __VLS_38 = __VLS_37({ asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    var __VLS_42 = {
        close: ((__VLS_ctx.close)),
    };
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.close) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), fill: ("none"), viewBox: ("0 0 24 24"), "stroke-width": ("1.5"), stroke: ("currentColor"), ...{ class: ("w-6 h-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), d: ("M6 18L18 6M6 6l12 12"), });
    __VLS_nonNullable(__VLS_41.slots).default;
    __VLS_nonNullable(__VLS_41.slots).default;
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    __VLS_nonNullable(__VLS_34.slots).default;
    const __VLS_34 = __VLS_pickFunctionalComponentCtx(__VLS_29, __VLS_31);
    const __VLS_43 = __VLS_resolvedLocalAndGlobalComponents.DialogDescription;
    /** @type { [typeof __VLS_components.DialogDescription, typeof __VLS_components.DialogDescription, ] } */
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({ asChild: (true), }));
    const __VLS_45 = __VLS_44({ asChild: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    var __VLS_49 = {};
    __VLS_nonNullable(__VLS_48.slots).default;
    const __VLS_48 = __VLS_pickFunctionalComponentCtx(__VLS_43, __VLS_45);
    var __VLS_50 = {
        close: ((__VLS_ctx.close)),
    };
    __VLS_nonNullable(__VLS_23.slots).default;
    const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_18, __VLS_20);
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['data-[state=open]:animate-in'];
    __VLS_styleScopedClasses['data-[state=closed]:animate-out'];
    __VLS_styleScopedClasses['data-[state=closed]:fade-out-0'];
    __VLS_styleScopedClasses['data-[state=open]:fade-in-0'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['bg-black/30'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['w-1/4'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['data-[state=open]:animate-in'];
    __VLS_styleScopedClasses['data-[state=closed]:animate-out'];
    __VLS_styleScopedClasses['data-[state=open]:slide-in-from-right'];
    __VLS_styleScopedClasses['data-[state=closed]:slide-out-to-right'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
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
            DialogClose: DialogClose,
            DialogContent: DialogContent,
            DialogDescription: DialogDescription,
            DialogOverlay: DialogOverlay,
            DialogPortal: DialogPortal,
            DialogRoot: DialogRoot,
            DialogTitle: DialogTitle,
            show: show,
            close: close,
            unmount: unmount,
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
//# sourceMappingURL=rdialog.vue.js.map