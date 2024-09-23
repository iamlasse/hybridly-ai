/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const __VLS_props = defineProps();
const form = useForm({
    method: 'POST',
    url: route('login'),
    fields: {
        email: 'test@example.com',
        password: 'password',
        remember: false,
    }
});
const submit = () => {
    form.submit();
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.Head;
    /** @type { [typeof __VLS_components.Head, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ title: ("Log in"), }));
    const __VLS_2 = __VLS_1({ title: ("Log in"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    if (__VLS_ctx.status) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4 font-medium text-sm text-green-600") }, });
        (__VLS_ctx.status);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submit) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ for: ("email"), value: ("Email"), }));
    const __VLS_8 = __VLS_7({ for: ("email"), value: ("Email"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ id: ("email"), type: ("email"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.email)), required: (true), autofocus: (true), autocomplete: ("username"), }));
    const __VLS_14 = __VLS_13({ id: ("email"), type: ("email"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.email)), required: (true), autofocus: (true), autocomplete: ("username"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.InputError;
    /** @type { [typeof __VLS_components.InputError, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("mt-2") }, message: ((__VLS_ctx.form.errors.email)), }));
    const __VLS_20 = __VLS_19({ ...{ class: ("mt-2") }, message: ((__VLS_ctx.form.errors.email)), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ for: ("password"), value: ("Password"), }));
    const __VLS_26 = __VLS_25({ for: ("password"), value: ("Password"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ id: ("password"), type: ("password"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.password)), required: (true), autocomplete: ("current-password"), }));
    const __VLS_32 = __VLS_31({ id: ("password"), type: ("password"), ...{ class: ("mt-1 block w-full") }, modelValue: ((__VLS_ctx.form.fields.password)), required: (true), autocomplete: ("current-password"), }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.InputError;
    /** @type { [typeof __VLS_components.InputError, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("mt-2") }, message: ((__VLS_ctx.form.errors.password)), }));
    const __VLS_38 = __VLS_37({ ...{ class: ("mt-2") }, message: ((__VLS_ctx.form.errors.password)), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("block mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("flex items-center") }, });
    const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Checkbox;
    /** @type { [typeof __VLS_components.Checkbox, ] } */
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ name: ("remember"), checked: ((__VLS_ctx.form.fields.remember)), }));
    const __VLS_44 = __VLS_43({ name: ("remember"), checked: ((__VLS_ctx.form.fields.remember)), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ms-2 text-sm text-gray-600 dark:text-gray-400") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center justify-end mt-4") }, });
    if (__VLS_ctx.canResetPassword) {
        const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.Link;
        /** @type { [typeof __VLS_components.Link, typeof __VLS_components.Link, ] } */
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ href: ((__VLS_ctx.route('password.request'))), ...{ class: ("underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800") }, }));
        const __VLS_50 = __VLS_49({ href: ((__VLS_ctx.route('password.request'))), ...{ class: ("underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_nonNullable(__VLS_53.slots).default;
        const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
    }
    const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
    /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("ms-4") }, ...{ class: (({ 'opacity-25': __VLS_ctx.form.processing })) }, disabled: ((__VLS_ctx.form.processing)), }));
    const __VLS_56 = __VLS_55({ ...{ class: ("ms-4") }, ...{ class: (({ 'opacity-25': __VLS_ctx.form.processing })) }, disabled: ((__VLS_ctx.form.processing)), }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_nonNullable(__VLS_59.slots).default;
    const __VLS_59 = __VLS_pickFunctionalComponentCtx(__VLS_54, __VLS_56);
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-green-600'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['ms-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['dark:text-gray-400'];
    __VLS_styleScopedClasses['hover:text-gray-900'];
    __VLS_styleScopedClasses['dark:hover:text-gray-100'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['dark:focus:ring-offset-gray-800'];
    __VLS_styleScopedClasses['ms-4'];
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
            form: form,
            submit: submit,
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
//# sourceMappingURL=login.vue.js.map