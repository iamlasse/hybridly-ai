/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const user = useProperty('security.user');
console.log(user);
let __VLS_typeProps;
const $props = defineProps();
const form = useForm({
    method: 'put',
    url: route('billing.cancel-subscription'),
    fields: {
        subscription_id: null
    }
});
const cancelSubscription = () => {
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4 py-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-3xl font-bold mb-6 text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white rounded-lg shadow-md p-6 mb-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-lg mb-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("font-bold") }, });
    (__VLS_ctx.user?.is_premium ? 'Premium' : 'Free');
    if (__VLS_ctx.user && __VLS_ctx.user.activeSubscription && !__VLS_ctx.user.activeSubscription.ends_at) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-400") }, });
        (new Date(__VLS_ctx.user.activeSubscription.ends_at).toLocaleDateString());
    }
    if (__VLS_ctx.user && __VLS_ctx.user.is_premium) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        if (!__VLS_ctx.user.activeSubscription) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold mb-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
            const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
            /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.primaryButton, typeof __VLS_components.PrimaryButton, typeof __VLS_components.primaryButton, ] } */
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, ...{ class: ("bg-red-500 justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded") }, disabled: ((__VLS_ctx.form.processing)), }));
            const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, ...{ class: ("bg-red-500 justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded") }, disabled: ((__VLS_ctx.form.processing)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            let __VLS_6;
            const __VLS_7 = {
                onClick: (__VLS_ctx.cancelSubscription)
            };
            let __VLS_3;
            let __VLS_4;
            __VLS_nonNullable(__VLS_5.slots).default;
            const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            (new Date(__VLS_ctx.user.activeSubscription.ends_at).toDateString());
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
        if (__VLS_ctx.user && __VLS_ctx.user.activeSubscription.ends_at !== null) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (new Date(__VLS_ctx.user.activeSubscription.ends_at).toDateString());
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.route('upgrade.show'))), ...{ class: ("bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block") }, });
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-white shadow-md rounded-lg p-6") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-semibold mb-4") }, });
    if (__VLS_ctx.invoices.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({ ...{ class: ("w-full") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("text-left") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("text-left") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("text-left") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({ ...{ class: ("text-left") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
        for (const [invoice] of __VLS_getVForSourceType((__VLS_ctx.invoices))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({ key: ((invoice.id)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (new Date(invoice.created * 1000).toDateString());
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (invoice.total / 100);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            (invoice.status);
            __VLS_elementAsFunction(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((invoice.invoice_pdf)), target: ("_blank"), ...{ class: ("text-blue-500 hover:underline") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-gray-600") }, });
    }
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-8'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['mb-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['hover:bg-red-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-left'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['hover:underline'];
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
            user: user,
            form: form,
            cancelSubscription: cancelSubscription,
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