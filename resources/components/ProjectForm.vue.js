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
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onChange': {} }, id: ("name"), modelValue: ((__VLS_ctx.form.name)), type: ("text"), ...{ class: ("block w-full") }, }));
    const __VLS_8 = __VLS_7({ ...{ 'onChange': {} }, id: ("name"), modelValue: ((__VLS_ctx.form.name)), type: ("text"), ...{ class: ("block w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_12;
    const __VLS_13 = {
        onChange: (...[$event]) => {
            __VLS_ctx.form.validate('name');
        }
    };
    let __VLS_9;
    let __VLS_10;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    if (__VLS_ctx.form.errors.name) {
        const __VLS_14 = __VLS_resolvedLocalAndGlobalComponents.InputError;
        /** @type { [typeof __VLS_components.InputError, ] } */
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-1 text-sm text-red-500") }, }));
        const __VLS_16 = __VLS_15({ message: ((__VLS_ctx.form.errors.name)), ...{ class: ("mt-1 text-sm text-red-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    const __VLS_20 = __VLS_resolvedLocalAndGlobalComponents.InputLabel;
    /** @type { [typeof __VLS_components.InputLabel, ] } */
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ for: ("description"), value: ("Description"), }));
    const __VLS_22 = __VLS_21({ for: ("description"), value: ("Description"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_26 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
    /** @type { [typeof __VLS_components.TextInput, ] } */
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ ...{ 'onChange': {} }, id: ("description"), modelValue: ((__VLS_ctx.form.description)), type: ("text"), ...{ class: ("block w-full") }, }));
    const __VLS_28 = __VLS_27({ ...{ 'onChange': {} }, id: ("description"), modelValue: ((__VLS_ctx.form.description)), type: ("text"), ...{ class: ("block w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_32;
    const __VLS_33 = {
        onChange: (...[$event]) => {
            __VLS_ctx.form.validate('description');
        }
    };
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    if (__VLS_ctx.form.errors.description) {
        const __VLS_34 = __VLS_resolvedLocalAndGlobalComponents.InputError;
        /** @type { [typeof __VLS_components.InputError, ] } */
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-1 text-sm text-red-500") }, }));
        const __VLS_36 = __VLS_35({ message: ((__VLS_ctx.form.errors.description)), ...{ class: ("mt-1 text-sm text-red-500") }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-6") }, });
    const __VLS_40 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
    /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({ type: ("submit"), ...{ class: ("w-full") }, disabled: ((__VLS_ctx.form.processing)), }));
    const __VLS_42 = __VLS_41({ type: ("submit"), ...{ class: ("w-full") }, disabled: ((__VLS_ctx.form.processing)), }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_nonNullable(__VLS_45.slots).default;
    const __VLS_45 = __VLS_pickFunctionalComponentCtx(__VLS_40, __VLS_42);
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