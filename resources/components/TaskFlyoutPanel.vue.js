/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { ref, onMounted, onUnmounted } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emit = defineEmits(['close']);
const panelRef = ref(null);
const commentForm = useForm({
    comment: ''
});
// const loadedTask = ref<Task|null>()
const addComment = () => {
    router.post(route('comments.store'), {
        body: commentForm.comment,
        commentable_id: props.task?.id,
        commentable_type: 'task',
    }, {
        // preserveState: false,
        replace: false,
        preserveScroll: true,
        onSuccess: () => {
            commentForm.reset();
            router.reload();
        }
    });
};
const closeFlyout = () => {
    emit('close');
};
const handleOutsideClick = (event) => {
    if (panelRef.value && !panelRef.value.contains(event.target)) {
        closeFlyout();
    }
};
onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
});
// watchEffect( async () =>
// {
//     if(!props.task) return
//     const task = await fetch( route( 'tasks.show', { task: props.task?.id } ) ).then( res => res.json() )
//     loadedTask.value = task
//     // router.get( route( 'tasks.show', props.task?.id ?? 528 ), {
//     //     preserveState: true,
//     //     replace: false
//     // } );
// })
onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
    document.removeEventListener('click', handleOutsideClick);
});
// watch(() => props.isOpen, (newValue) => {
//   if (newValue) {
//     // Add click listener when panel is opened
//     setTimeout(() => {
//       document.addEventListener('click', handleOutsideClick);
//     }, 0);
//   } else {
//     // Remove click listener when panel is closed
//     document.removeEventListener('click', handleOutsideClick);
//   }
// });
const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        closeFlyout();
    }
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: () => { } }, ref: ("panelRef"), ...{ class: ("fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto") }, ...{ class: (({ 'translate-x-full': !__VLS_ctx.isOpen, 'translate-x-0': __VLS_ctx.isOpen })) }, });
    // @ts-ignore navigation for `const panelRef = ref()`
    __VLS_ctx.panelRef;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 flex items-center justify-between") }, });
    var __VLS_0 = {
        ...{ class: ("order-first") },
    };
    (__VLS_ctx.task?.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.closeFlyout) }, ...{ class: (" text-gray-500 hover:text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("h-6 w-6") }, fill: ("none"), viewBox: ("0 0 24 24"), stroke: ("currentColor"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M6 18L18 6M6 6l12 12"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 text-gray-500") }, });
    var __VLS_1 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("block text-sm font-medium text-gray-700") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.addComment) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.commentForm.comment)), rows: ("3"), ...{ class: ("block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm") }, placeholder: ("Leave a comment"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2 flex justify-end") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.addComment) }, type: ("button"), ...{ class: ("inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ role: ("list"), ...{ class: ("mt-4 divide-y divide-gray-200") }, });
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.task?.comments))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((comment.id)), ...{ class: ("py-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-1 space-y-1") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center justify-between") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-sm font-medium") }, });
        (comment.user?.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500") }, });
        (comment.readable_created_time);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-500") }, });
        (comment.body);
    }
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['top-0'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['w-1/4'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['translate-x-full'];
    __VLS_styleScopedClasses['translate-x-0'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['hover:text-gray-700'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-gray-700'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['border-gray-300'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['focus:border-indigo-500'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['sm:text-sm'];
    __VLS_styleScopedClasses['mt-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-transparent'];
    __VLS_styleScopedClasses['bg-indigo-600'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['hover:bg-indigo-700'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['focus:ring-2'];
    __VLS_styleScopedClasses['focus:ring-indigo-500'];
    __VLS_styleScopedClasses['focus:ring-offset-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['divide-y'];
    __VLS_styleScopedClasses['divide-gray-200'];
    __VLS_styleScopedClasses['py-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['space-x-3'];
    __VLS_styleScopedClasses['flex-1'];
    __VLS_styleScopedClasses['space-y-1'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-500'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "panelRef": __VLS_nativeElements['div'],
    };
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
            panelRef: panelRef,
            commentForm: commentForm,
            addComment: addComment,
            closeFlyout: closeFlyout,
        };
    },
    emits: {},
    __typeProps: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
export default {};
;
//# sourceMappingURL=TaskFlyoutPanel.vue.js.map