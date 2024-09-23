import { ref, onMounted } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import CComment from '@/Components/CComment.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const emit = defineEmits(['addedComment']);
const comments = ref(props.comments);
onMounted(() => {
    // console.log(comments.value)
});
const commentForm = useForm({
    method: 'POST',
    url: route('task.comments.store', { task: props.owner?.id }),
    fields: {
        comment: ''
    }
});
// const loadedTask = ref<Task|null>()
const addComment = () => {
    router.post(route('task.comments.store', { task: props.owner?.id }), {
        body: commentForm.fields.comment,
        commentable_id: props.owner?.id,
        commentable_type: 'task',
        preserveState: true,
        replace: true,
        preserveScroll: true,
        onSuccess: () => {
            commentForm.reset();
            router.visit(route('tasks.show', { task: props.owner?.id }), {
                replace: false,
                only: ['comments']
            });
        }
    });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("space-y-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.addComment) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.commentForm.fields.comment)), rows: ("3"), ...{ class: ("block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm") }, placeholder: ("Leave a comment"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2 flex justify-end") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.addComment) }, disabled: ((!__VLS_ctx.commentForm.isDirty)), type: ("button"), ...{ class: ("inline-flex items-center rounded-md border border-transparent disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2") }, });
    for (const [comment] of __VLS_getVForSourceType((__VLS_ctx.comments))) {
        // @ts-ignore
        [CComment,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(CComment, new CComment({ key: ((comment.id)), comment: ((comment)), }));
        const __VLS_1 = __VLS_0({ key: ((comment.id)), comment: ((comment)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    __VLS_styleScopedClasses['space-y-4'];
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
    __VLS_styleScopedClasses['disabled:bg-slate-400'];
    __VLS_styleScopedClasses['disabled:cursor-not-allowed'];
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
            CComment: CComment,
            comments: comments,
            commentForm: commentForm,
            addComment: addComment,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
;
//# sourceMappingURL=CommentsSection.vue.js.map