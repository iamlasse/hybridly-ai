/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import draggable from 'vuedraggable';
import { Button } from '@/components/ui/button';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const user = useProperty('security.user');
const emit = defineEmits(['updateTasks', 'addTask', 'addColumn', 'deleteStage', 'updateColumns']);
const localColumns = ref([]);
const showAddColumnForm = ref(false);
const newColumnName = ref('');
const newColumnInput = ref(null);
const newTaskInput = ref(null);
watchEffect(() => {
    localColumns.value = JSON.parse(JSON.stringify(props.columns)).map((column, index) => ({
        ...column,
        newTaskName: '',
        showAddTask: false,
        order: index
    }));
});
const computedColumns = computed({
    get: () => localColumns.value,
    set: (value) => {
        localColumns.value = value;
    }
});
const onDragChange = (event, column) => {
    if (event.added || event.moved) {
        updateTasksOrder();
    }
};
const onColumnDragChange = (event) => {
    if (event.moved) {
        updateColumnsOrder();
    }
};
function updateTasksOrder() {
    const updatedTasks = [];
    computedColumns.value.forEach((column) => {
        column.tasks.forEach((task, index) => {
            updatedTasks.push({
                id: task.id,
                status: column.id,
                order: index
            });
        });
    });
    emit('updateTasks', updatedTasks);
}
function updateColumnsOrder() {
    const updatedColumns = computedColumns.value.map((column, index) => ({
        id: column.id,
        order: index
    }));
    console.log(updatedColumns);
    router.post(route('projects.stages.updateOrder', { project: props.projectId }), {
        data: {
            columns: updatedColumns
        },
        preserveState: true,
        preserveScroll: true
    });
}
const addColumnForm = useForm({
    method: 'post',
    url: route('projects.stages.store', { project: props.projectId }),
    replace: false,
    preserveUrl: true,
    fields: {
        name: '',
        projectId: props.projectId,
    }
});
async function addColumn() {
    try {
        addColumnForm.submit();
    }
    catch (error) {
        console.error('Error adding column:', error);
    }
}
function cancelAddColumn() {
    showAddColumnForm.value = false;
    newColumnName.value = '';
}
function handleKeyUp(event) {
    if (event.key === 'Escape') {
        const activeColumn = localColumns.value.find((column) => column.showAddTask);
        if (activeColumn) {
            cancelAddTask(activeColumn);
        }
        else if (showAddColumnForm.value) {
            cancelAddColumn();
        }
    }
}
const selectedTask = ref(null);
function selectTask(task) {
    // if ( task.id === selectedTask.value?.id )
    // {
    //     selectedTask.value = null;
    //     return;
    // }
    console.log('select task', task?.id);
    selectedTask.value = task;
    // //   emit('selectTask', task);
    router.get(route('tasks.show', { task: task.id }), {
        preserveScroll: true,
        hooks: {
            success: () => {
                console.log('success');
            }
        }
    });
}
function showAddTaskCard(column) {
    localColumns.value.forEach((col) => {
        if (col.id !== column.id) {
            col.showAddTask = false;
        }
    });
    column.showAddTask = true;
    nextTick(() => {
        if (newTaskInput.value) {
            newTaskInput.value.focus();
        }
    });
}
function cancelAddTask(column) {
    column.showAddTask = false;
    column.newTaskName = '';
}
const maxTasksPerStage = ref(user.value?.is_premium ? Infinity : 5);
function addTask(column) {
    if (!column.newTaskName.trim())
        return;
    if (column.tasks.length >= maxTasksPerStage.value) {
        alert('Your account only allows you to add up to 5 tasks per stage. Please upgrade to add more.');
        return;
    }
    emit('addTask', {
        name: column.newTaskName,
        description: '',
        status: column.id,
        projectId: props.projectId
    });
    column.newTaskName = '';
    column.showAddTask = false;
}
function handleOutsideClick(event) {
    const target = event.target;
    if (!target.closest('.add-task-card') && !target.closest('button')) {
        localColumns.value.forEach((column) => {
            if (column.showAddTask) {
                cancelAddTask(column);
            }
        });
    }
}
function handleOutsideClickTaskCard(event) {
    const target = event.target;
    if (!target.closest('.task-card')) {
        selectedTask.value = null;
    }
}
// Handle click outside task card, set selected task to null
onMounted(() => {
    document.addEventListener('click', handleOutsideClickTaskCard);
});
onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClickTaskCard);
});
function deleteStage(column) {
    console.log('Delete stage clicked:', column.name);
    if (confirm(`Are you sure you want to delete the "${column.name}" stage? All tasks in this stage will be moved to 'Pending'.`)) {
        const pendingColumn = localColumns.value.find((col) => col.name.toLowerCase() === 'pending');
        if (!pendingColumn) {
            alert("Error: 'Pending' column not found. Please ensure there's a 'Pending' column before deleting stages.");
            return;
        }
        // Move tasks to pending
        pendingColumn.tasks = [...pendingColumn.tasks, ...column.tasks];
        // Emit event to parent component to handle the stage deletion and task reassignment
        emit('deleteStage', {
            column,
            stageId: column.id,
            tasksToReassign: column.tasks.map((task) => task.id)
        });
    }
}
onMounted(() => {
    document.addEventListener('keyup', handleKeyUp);
});
onUnmounted(() => {
    document.removeEventListener('keyup', handleKeyUp);
});
watchEffect(() => {
    if (showAddColumnForm.value) {
        nextTick(() => {
            newColumnInput.value?.focus();
        });
    }
});
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleOutsideClick) }, ...{ class: ("kanban-board h-full px-4 flex overflow-x-auto text-slate-500") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.draggable;
    /** @type { [typeof __VLS_components.Draggable, typeof __VLS_components.draggable, typeof __VLS_components.Draggable, typeof __VLS_components.draggable, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onChange': {} }, modelValue: ((__VLS_ctx.computedColumns)), animation: ((200)), ghostClass: ("ghost-column"), handle: (".column-handle"), itemKey: ("id"), ...{ class: ("flex") }, }));
    const __VLS_2 = __VLS_1({ ...{ 'onChange': {} }, modelValue: ((__VLS_ctx.computedColumns)), animation: ((200)), ghostClass: ("ghost-column"), handle: (".column-handle"), itemKey: ("id"), ...{ class: ("flex") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onChange: (__VLS_ctx.onColumnDragChange)
    };
    let __VLS_3;
    let __VLS_4;
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { item: __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        const { element: column } = __VLS_getSlotParam(__VLS_thisSlot);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("kanban-column flex-shrink-0 w-64 bg-gray-100 p-4 mr-4 rounded flex flex-col") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center mb-4 column-handle cursor-move") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-lg text-gray-800 font-semibold") }, });
        (column.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("group") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.deleteStage(column);
                } }, ...{ class: ("text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition duration-300") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({ xmlns: ("http://www.w3.org/2000/svg"), ...{ class: ("h-5 w-5") }, fill: ("none"), viewBox: ("0 0 24 24"), stroke: ("currentColor"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.path)({ "stroke-linecap": ("round"), "stroke-linejoin": ("round"), "stroke-width": ("2"), d: ("M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex-grow overflow-y-auto") }, });
        const __VLS_8 = __VLS_resolvedLocalAndGlobalComponents.draggable;
        /** @type { [typeof __VLS_components.Draggable, typeof __VLS_components.draggable, typeof __VLS_components.Draggable, typeof __VLS_components.draggable, ] } */
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{ 'onChange': {} }, modelValue: ((column.tasks)), group: (({ name: 'tasks', pull: true, put: true })), ghostClass: ("ghost"), ...{ class: ("flex flex-col gap-2") }, itemKey: ("id"), }));
        const __VLS_10 = __VLS_9({ ...{ 'onChange': {} }, modelValue: ((column.tasks)), group: (({ name: 'tasks', pull: true, put: true })), ghostClass: ("ghost"), ...{ class: ("flex flex-col gap-2") }, itemKey: ("id"), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        let __VLS_14;
        const __VLS_15 = {
            onChange: ((e) => __VLS_ctx.onDragChange(e, column))
        };
        let __VLS_11;
        let __VLS_12;
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            const { item: __VLS_thisSlot } = __VLS_nonNullable(__VLS_13.slots);
            const [{ element }] = __VLS_getSlotParams(__VLS_thisSlot);
            const __VLS_16 = __VLS_resolvedLocalAndGlobalComponents.TaskCard;
            /** @type { [typeof __VLS_components.TaskCard, ] } */
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ ...{ 'onSelectTask': {} }, task: ((element)), selected: ((element.id === __VLS_ctx.selectedTask?.id)), }));
            const __VLS_18 = __VLS_17({ ...{ 'onSelectTask': {} }, task: ((element)), selected: ((element.id === __VLS_ctx.selectedTask?.id)), }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            let __VLS_22;
            const __VLS_23 = {
                onSelectTask: (__VLS_ctx.selectTask)
            };
            let __VLS_19;
            let __VLS_20;
            const __VLS_21 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18);
        }
        const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
        if (column.showAddTask) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: () => { } }, ...{ class: ("add-task-card bg-white shadow-sm p-1") }, });
            const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.TextInput;
            /** @type { [typeof __VLS_components.TextInput, ] } */
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onKeyup': {} }, ...{ 'onKeyup': {} }, modelValue: ((column.newTaskName)), type: ("text"), placeholder: ("Write a task name"), ...{ class: ("w-full mb-2 border-0 active:border-0 ring-0 active:ring-0 focus:ring-0 shadow-none ") }, ref: ("newTaskInput"), }));
            const __VLS_26 = __VLS_25({ ...{ 'onKeyup': {} }, ...{ 'onKeyup': {} }, modelValue: ((column.newTaskName)), type: ("text"), placeholder: ("Write a task name"), ...{ class: ("w-full mb-2 border-0 active:border-0 ring-0 active:ring-0 focus:ring-0 shadow-none ") }, ref: ("newTaskInput"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            // @ts-ignore navigation for `const newTaskInput = ref()`
            __VLS_ctx.newTaskInput;
            var __VLS_30 = {};
            let __VLS_31;
            const __VLS_32 = {
                onKeyup: (...[$event]) => {
                    if (!((column.showAddTask)))
                        return;
                    __VLS_ctx.addTask(column);
                }
            };
            const __VLS_33 = {
                onKeyup: (...[$event]) => {
                    if (!((column.showAddTask)))
                        return;
                    __VLS_ctx.cancelAddTask(column);
                }
            };
            let __VLS_27;
            let __VLS_28;
            const __VLS_29 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-end") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                        if (!((column.showAddTask)))
                            return;
                        __VLS_ctx.cancelAddTask(column);
                    } }, ...{ class: ("text-gray-500 mr-2") }, });
            const __VLS_34 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
            /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({ ...{ 'onClick': {} }, ...{ class: ("bg-blue-500 hover:bg-blue-600") }, }));
            const __VLS_36 = __VLS_35({ ...{ 'onClick': {} }, ...{ class: ("bg-blue-500 hover:bg-blue-600") }, }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            let __VLS_40;
            const __VLS_41 = {
                onClick: (...[$event]) => {
                    if (!((column.showAddTask)))
                        return;
                    __VLS_ctx.addTask(column);
                }
            };
            let __VLS_37;
            let __VLS_38;
            __VLS_nonNullable(__VLS_39.slots).default;
            const __VLS_39 = __VLS_pickFunctionalComponentCtx(__VLS_34, __VLS_36);
        }
        else {
            const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.Button;
            /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ 'onClick': {} }, variant: ("primary"), ...{ class: ("w-full") }, }));
            const __VLS_44 = __VLS_43({ ...{ 'onClick': {} }, variant: ("primary"), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
            let __VLS_48;
            const __VLS_49 = {
                onClick: (...[$event]) => {
                    if (!(!((column.showAddTask))))
                        return;
                    __VLS_ctx.showAddTaskCard(column);
                }
            };
            let __VLS_45;
            let __VLS_46;
            __VLS_nonNullable(__VLS_47.slots).default;
            const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        }
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("kanban-column-new flex-shrink-0 w-64 bg-gray-100 p-4 mr-4 rounded") }, });
    if (!__VLS_ctx.showAddColumnForm) {
        const __VLS_50 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ ...{ 'onClick': {} }, ...{ class: ("block w-full justify-center") }, variant: ("secondary"), }));
        const __VLS_52 = __VLS_51({ ...{ 'onClick': {} }, ...{ class: ("block w-full justify-center") }, variant: ("secondary"), }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        let __VLS_56;
        const __VLS_57 = {
            onClick: (...[$event]) => {
                if (!((!__VLS_ctx.showAddColumnForm)))
                    return;
                __VLS_ctx.showAddColumnForm = true;
            }
        };
        let __VLS_53;
        let __VLS_54;
        __VLS_nonNullable(__VLS_55.slots).default;
        const __VLS_55 = __VLS_pickFunctionalComponentCtx(__VLS_50, __VLS_52);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.addColumn) }, ...{ class: ("bg-white p-4 rounded shadow") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ ...{ onKeydown: (__VLS_ctx.cancelAddColumn) }, value: ((__VLS_ctx.addColumnForm.fields.name)), type: ("text"), placeholder: ("Enter column name"), ...{ class: ("w-full mb-2 p-2 border rounded") }, ref: ("newColumnInput"), });
        // @ts-ignore navigation for `const newColumnInput = ref()`
        __VLS_ctx.newColumnInput;
        const __VLS_58 = __VLS_resolvedLocalAndGlobalComponents.Button;
        /** @type { [typeof __VLS_components.Button, typeof __VLS_components.Button, ] } */
        // @ts-ignore
        const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({ type: ("submit"), ...{ class: ("w-full") }, }));
        const __VLS_60 = __VLS_59({ type: ("submit"), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_59));
        __VLS_nonNullable(__VLS_63.slots).default;
        const __VLS_63 = __VLS_pickFunctionalComponentCtx(__VLS_58, __VLS_60);
    }
    __VLS_styleScopedClasses['kanban-board'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['overflow-x-auto'];
    __VLS_styleScopedClasses['text-slate-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['kanban-column'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['bg-gray-100'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['mr-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['column-handle'];
    __VLS_styleScopedClasses['cursor-move'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['group'];
    __VLS_styleScopedClasses['text-red-500'];
    __VLS_styleScopedClasses['hover:text-red-700'];
    __VLS_styleScopedClasses['opacity-0'];
    __VLS_styleScopedClasses['group-hover:opacity-100'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['flex-grow'];
    __VLS_styleScopedClasses['overflow-y-auto'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['add-task-card'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['p-1'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['border-0'];
    __VLS_styleScopedClasses['active:border-0'];
    __VLS_styleScopedClasses['ring-0'];
    __VLS_styleScopedClasses['active:ring-0'];
    __VLS_styleScopedClasses['focus:ring-0'];
    __VLS_styleScopedClasses['shadow-none'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['text-gray-500'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['bg-blue-500'];
    __VLS_styleScopedClasses['hover:bg-blue-600'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['kanban-column-new'];
    __VLS_styleScopedClasses['flex-shrink-0'];
    __VLS_styleScopedClasses['w-64'];
    __VLS_styleScopedClasses['bg-gray-100'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['mr-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['block'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['shadow'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['w-full'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "newTaskInput": __VLS_30,
        "newColumnInput": __VLS_nativeElements['input'],
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
            draggable: draggable,
            Button: Button,
            showAddColumnForm: showAddColumnForm,
            newColumnInput: newColumnInput,
            newTaskInput: newTaskInput,
            computedColumns: computedColumns,
            onDragChange: onDragChange,
            onColumnDragChange: onColumnDragChange,
            addColumnForm: addColumnForm,
            addColumn: addColumn,
            cancelAddColumn: cancelAddColumn,
            selectedTask: selectedTask,
            selectTask: selectTask,
            showAddTaskCard: showAddTaskCard,
            cancelAddTask: cancelAddTask,
            addTask: addTask,
            handleOutsideClick: handleOutsideClick,
            deleteStage: deleteStage,
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
//# sourceMappingURL=KanBanBoard.vue.js.map