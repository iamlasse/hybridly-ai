/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const show = defineModel({ default: false, required: true });
const emit = defineEmits(['close']);
const form = useForm({
    method: 'POST',
    url: route('projects.store'),
    fields: {
        name: '',
        description: '',
    }
});
const closeModal = () => {
    form.reset();
    emit('close');
};
const createProject = async () => {
    await form.submitWith({
        preserveScroll: true,
    });
    closeModal();
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    emits: {
        ...{},
        ...{},
    },
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
    let __VLS_resolvedLocalAndGlobalComponents;
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Modal;
    /** @type { [typeof __VLS_components.Modal, typeof __VLS_components.Modal, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClose': {} }, modelValue: ((__VLS_ctx.show)), closable: ("false"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onClose': {} }, modelValue: ((__VLS_ctx.show)), closable: ("false"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onClose: (__VLS_ctx.closeModal)
    };
    let __VLS_3;
    let __VLS_4;
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-lg font-medium text-gray-900") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { description: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mt-1 text-sm text-gray-600") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.createProject) }, ...{ class: ("mt-6 space-y-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ for: ("name"), value: ("Project Name"), }));
    const __VLS_10 = __VLS_9({ for: ("name"), value: ("Project Name"), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    const __VLS_14 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ id: ("name"), type: ("text"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.name)), required: (true), autofocus: (true), }));
    const __VLS_16 = __VLS_15({ id: ("name"), type: ("text"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.name)), required: (true), autofocus: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const __VLS_20 = __VLS_resolvedLocalAndGlobalComponents.InputError;
    /** @type { [typeof __VLS_components.InputError, ] } */
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-2") }, }));
    const __VLS_22 = __VLS_21({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_26 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ for: ("description"), value: ("Description"), }));
    const __VLS_28 = __VLS_27({ for: ("description"), value: ("Description"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    const __VLS_32 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ id: ("description"), type: ("text"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.description)), }));
    const __VLS_34 = __VLS_33({ id: ("description"), type: ("text"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.description)), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const __VLS_38 = __VLS_resolvedLocalAndGlobalComponents.InputError;
    /** @type { [typeof __VLS_components.InputError, ] } */
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-2") }, }));
    const __VLS_40 = __VLS_39({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center justify-end mt-4") }, });
    const __VLS_44 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
    /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({ ...{ class: (({ 'opacity-25': __VLS_ctx.form.processing })) }, disabled: ((__VLS_ctx.form.processing)), }));
    const __VLS_46 = __VLS_45({ ...{ class: (({ 'opacity-25': __VLS_ctx.form.processing })) }, disabled: ((__VLS_ctx.form.processing)), }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_nonNullable(__VLS_49.slots).default;
    const __VLS_49 = __VLS_pickFunctionalComponentCtx(__VLS_44, __VLS_46);
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-900'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['space-y-6'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['opacity-25'];
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
            show: show,
            form: form,
            closeModal: closeModal,
            createProject: createProject,
        };
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
});
;
//# sourceMappingURL=CreateProjectModal.vue.js.map