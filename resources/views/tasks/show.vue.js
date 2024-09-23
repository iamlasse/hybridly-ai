/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import Dialog from "@/components/rdialog.vue";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const commentForm = useForm({
    method: "POST",
    url: route("task.comments.store", { task: props.task }),
    fields: {
        body: "",
    },
    hooks: {
        success: (payload, context) => {
            console.log("comment added", payload, context);
        },
    },
});
const onSubmit = () => {
    commentForm.submitWith({
        preserveState: false,
    });
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
    // @ts-ignore
    [Dialog, Dialog,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Dialog, new Dialog({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_4.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("font-semibold") }, });
        (__VLS_ctx.task.title);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("comments pb-4") }, });
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
        const __VLS_5 = __VLS_resolvedLocalAndGlobalComponents.CComment;
        /** @type { [typeof __VLS_components.CComment, ] } */
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({ key: ((comment.id)), comment: ((comment)), }));
        const __VLS_7 = __VLS_6({ key: ((comment.id)), comment: ((comment)), }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-slate-100 border-t -mr-6 -ml-6 sticky bottom-0") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("   ") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.onSubmit) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-col gap-2 p-2") }, });
    const __VLS_11 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({ ...{ class: ("border-0 w-full") }, type: ("text"), name: ("body"), modelValue: ((__VLS_ctx.commentForm.fields.body)), }));
    const __VLS_13 = __VLS_12({ ...{ class: ("border-0 w-full") }, type: ("text"), name: ("body"), modelValue: ((__VLS_ctx.commentForm.fields.body)), }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("actions flex justify-between items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm") }, });
    const __VLS_17 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
    /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.primaryButton, typeof __VLS_components.PrimaryButton, typeof __VLS_components.primaryButton, ] } */
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({ size: ("sm"), type: ("submit"), }));
    const __VLS_19 = __VLS_18({ size: ("sm"), type: ("submit"), }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_nonNullable(__VLS_22.slots).default;
    const __VLS_22 = __VLS_pickFunctionalComponentCtx(__VLS_17, __VLS_19);
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(Dialog, __VLS_1);
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-rows-[1fr_auto]'];
    __VLS_styleScopedClasses['h-[calc(100%-48px)]'];
    __VLS_styleScopedClasses['overflow-y-scroll'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['comments'];
    __VLS_styleScopedClasses['pb-4'];
    __VLS_styleScopedClasses['bg-slate-100'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['-mr-6'];
    __VLS_styleScopedClasses['-ml-6'];
    __VLS_styleScopedClasses['sticky'];
    __VLS_styleScopedClasses['bottom-0'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['actions'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-sm'];
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
            commentForm: commentForm,
            onSubmit: onSubmit,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
;
//# sourceMappingURL=show.vue.js.map