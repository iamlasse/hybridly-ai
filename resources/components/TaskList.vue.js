import { ref } from 'vue';
import TaskFlyoutPanel from './TaskFlyoutPanel.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    tasks: {
        type: Array,
        required: true,
    },
});
const selectedTask = ref(null);
const isPanelOpen = ref(false);
const selectTask = (task) => {
    selectedTask.value = task;
    isPanelOpen.value = true;
};
const closePanel = () => {
    isPanelOpen.value = false;
};
const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'done': 'bg-green-100 text-green-800',
};
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        tasks: {
            type: Array,
            required: true,
        },
    },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-4") }, });
    for (const [task, index] of __VLS_getVForSourceType((__VLS_ctx.tasks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.selectTask(task);
                } }, key: ((index)), ...{ class: ("cursor-pointer hover:bg-gray-100 p-2 rounded flex items-center space-x-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (task.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("inline-flex items-center rounded px-2 py-0.5 text-xs font-medium") }, ...{ class: ((__VLS_ctx.statusColors[task.status])) }, });
        (task.status);
    }
    // @ts-ignore
    [TaskFlyoutPanel,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TaskFlyoutPanel, new TaskFlyoutPanel({ ...{ 'onClose': {} }, task: ((__VLS_ctx.selectedTask)), isOpen: ((__VLS_ctx.isPanelOpen)), }));
    const __VLS_1 = __VLS_0({ ...{ 'onClose': {} }, task: ((__VLS_ctx.selectedTask)), isOpen: ((__VLS_ctx.isPanelOpen)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_5;
    const __VLS_6 = {
        onClose: (__VLS_ctx.closePanel)
    };
    let __VLS_2;
    let __VLS_3;
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(TaskFlyoutPanel, __VLS_1);
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['space-y-4'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-2'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['py-0.5'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['font-medium'];
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
            TaskFlyoutPanel: TaskFlyoutPanel,
            selectedTask: selectedTask,
            isPanelOpen: isPanelOpen,
            selectTask: selectTask,
            closePanel: closePanel,
            statusColors: statusColors,
        };
    },
    props: {
        tasks: {
            type: Array,
            required: true,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        tasks: {
            type: Array,
            required: true,
        },
    },
});
;
//# sourceMappingURL=TaskList.vue.js.map