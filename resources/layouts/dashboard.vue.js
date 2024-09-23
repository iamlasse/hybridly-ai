/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { ref } from "vue";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const sortBy = ref("Date");
function logout() {
    // router.post( route( 'logout' ) );
}
const user = useProperty("security.user");
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("min-h-screen flex bg-gradient-to-br from-gray-800 to-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({ ...{ class: ("w-64 p-6 flex flex-col bg-gray-900 text-white") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("flex-grow") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ href: ((__VLS_ctx.route('dashboard'))), ...{ class: ("flex items-center p-2 rounded hover:bg-gray-800") }, }));
    const __VLS_2 = __VLS_1({ href: ((__VLS_ctx.route('dashboard'))), ...{ class: ("flex items-center p-2 rounded hover:bg-gray-800") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("h-5 w-5 mr-3") }, viewBox: ("0 0 20 20"), fill: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ d: ("M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ d: ("M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"), });
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (__VLS_ctx.user) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-auto") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-gray-800 rounded-lg p-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(__VLS_ctx.user.name)}`)), alt: ((__VLS_ctx.user.name)), ...{ class: ("h-12 w-12 rounded-full mb-2 mx-auto") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg font-semibold text-center") }, });
        (__VLS_ctx.user.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-400 text-center") }, });
        (__VLS_ctx.user.email);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xs text-gray-400 text-center mt-1") }, });
        (__VLS_ctx.user.is_premium ? "Premium" : "Free");
    }
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ href: ((__VLS_ctx.route('billing.show'))), ...{ class: ("inline-flex cursor-pointer justify-center mt-2 items-center p-2 rounded hover:bg-gray-800") }, as: ("primary-button"), }));
    const __VLS_8 = __VLS_7({ href: ((__VLS_ctx.route('billing.show'))), ...{ class: ("inline-flex cursor-pointer justify-center mt-2 items-center p-2 rounded hover:bg-gray-800") }, as: ("primary-button"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("h-5 w-5 mr-3") }, viewBox: ("0 0 20 20"), fill: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "fill-rule": ("evenodd"), d: ("M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"), "clip-rule": ("evenodd"), });
    __VLS_nonNullable(__VLS_11.slots).default;
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ href: ((__VLS_ctx.route('logout'))), method: ("post"), as: ("primary-button"), ...{ class: ("bg-red-500 hover:bg-red-700 cursor-pointer justify-center inline-flex text-white font-bold py-2 mt-3 px-4 rounded") }, preserveScroll: (true), }));
    const __VLS_14 = __VLS_13({ href: ((__VLS_ctx.route('logout'))), method: ("post"), as: ("primary-button"), ...{ class: ("bg-red-500 hover:bg-red-700 cursor-pointer justify-center inline-flex text-white font-bold py-2 mt-3 px-4 rounded") }, preserveScroll: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    __VLS_nonNullable(__VLS_17.slots).default;
    const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: ("flex-1 overflow-y-auto") }, });
    var __VLS_18 = {};
    var __VLS_19 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-6") }, });
    var __VLS_20 = {};
    var __VLS_21 = {};
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['bg-gradient-to-br'];
    __VLS_styleScopedClasses['from-gray-800'];
    __VLS_styleScopedClasses['to-gray-700'];
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['bg-gray-900'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['flex-grow'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['hover:bg-gray-800'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['mr-3'];
    __VLS_styleScopedClasses['mt-auto'];
    __VLS_styleScopedClasses['bg-gray-800'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['h-12'];
    __VLS_styleScopedClasses['w-12'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['hover:bg-gray-800'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['mr-3'];
    __VLS_styleScopedClasses['bg-red-500'];
    __VLS_styleScopedClasses['hover:bg-red-700'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['gap-6'];
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
//# sourceMappingURL=dashboard.vue.js.map