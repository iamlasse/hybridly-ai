/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const form = useForm({
    method: 'post',
    url: route('projects.store'),
    preserveScroll: true,
    hooks: {
        success: () => {
            form.reset();
            emit('submit');
        }
    },
    fields: {
        name: '',
        description: '',
    }
});
const emit = defineEmits(['submit']);
const saveProject = () => {
    form.submit();
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.saveProject) }, ...{ class: ("") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ for: ("name"), value: ("Name"), }));
    const __VLS_2 = __VLS_1({ for: ("name"), value: ("Name"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ id: ("name"), modelValue: ((__VLS_ctx.form.fields.name)), type: ("text"), ...{ class: ("block w-full") }, }));
    const __VLS_8 = __VLS_7({ id: ("name"), modelValue: ((__VLS_ctx.form.fields.name)), type: ("text"), ...{ class: ("block w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    if (__VLS_ctx.form.errors.name) {
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.InputError;
        /** @type { [typeof __VLS_components.InputError, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-1 text-sm text-red-500") }, }));
        const __VLS_14 = __VLS_13({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-1 text-sm text-red-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ for: ("description"), value: ("Description"), }));
    const __VLS_20 = __VLS_19({ for: ("description"), value: ("Description"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ id: ("description"), modelValue: ((__VLS_ctx.form.fields.description)), type: ("text"), ...{ class: ("block w-full") }, }));
    const __VLS_26 = __VLS_25({ id: ("description"), modelValue: ((__VLS_ctx.form.fields.description)), type: ("text"), ...{ class: ("block w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    if (__VLS_ctx.form.errors.description) {
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.InputError;
        /** @type { [typeof __VLS_components.InputError, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-1 text-sm text-red-500") }, }));
        const __VLS_32 = __VLS_31({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-1 text-sm text-red-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6") }, });
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
    /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ type: ("submit"), ...{ class: ("w-full") }, disabled: ((__VLS_ctx.form.processing)), }));
    const __VLS_38 = __VLS_37({ type: ("submit"), ...{ class: ("w-full") }, disabled: ((__VLS_ctx.form.processing)), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_nonNullable(__VLS_41.slots).default;
    const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['w-full'];
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
            form: form,
            saveProject: saveProject,
        };
    },
    emits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
;
//# sourceMappingURL=ProjectForm.vue.js.map