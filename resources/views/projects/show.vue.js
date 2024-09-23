/// <reference types=".vue-global-types/vue_3.5_false.d.ts" />
import { ref, computed } from "vue";
import { can } from "hybridly";
import { SelectContent, SelectValue, SelectItem, SelectTrigger, SelectLabel, Select, } from "@/components/ui/select";
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let __VLS_typeProps;
const props = defineProps();
const user = useProperty("security.user");
const canAddCollaborators = can(props.project, "addCollaborators");
const localProject = computed(() => props.project);
// New state for selected task and panel visibility
const selectedTask = ref(null);
const isPanelOpen = ref(false);
const projectForm = useForm({
    method: "PUT",
    url: route("projects.update", { project: localProject.value.id }),
    fields: {
        name: localProject.value.name,
        description: localProject.value.description,
    },
});
const showModal = ref(false);
const form = useForm({
    method: "post",
    url: route("projects.tasks.store", { project: localProject.value.id }),
    fields: {
        name: "",
    },
});
const editTitle = ref(false);
const editDescription = ref(false);
const statusDropdownOpen = ref(false);
const availableStatuses = ["active", "completed", "on_hold"];
const showCollaboratorModal = ref(false);
function saveProject() {
    projectForm.submit();
}
function openModal() {
    showModal.value = true;
}
function closeModal() {
    showModal.value = false;
}
function ProjectStatus(status) {
    return availableStatuses.includes(status) ? status : "unknown";
}
function addTask(task) {
    const { name, description, status, projectId } = task;
    router.put(route("projects.tasks.store", { project: projectId }), {
        data: {
            name,
            description,
            status,
            projectId,
        },
        preserveScroll: true,
        preserveState: false,
        preserveUrl: true,
        hooks: {
            success: () => {
                form.reset();
            },
        },
    });
}
function updateProjectStatus(status) {
    router.put(route("projects.update-status", localProject.value.id), {
        data: { status },
        preserveScroll: true,
        preserveState: true,
        preserveUrl: true,
        hooks: {
            success: () => {
                statusDropdownOpen.value = false;
            },
        },
    });
}
const collaboratorForm = useForm({
    method: "PUT",
    url: route("projects.collaborators.store", {
        project: localProject.value.id,
    }),
    fields: {
        user_id: "",
    },
    hooks: {
        success: (payload, context) => {
            console.log("collaborator added", payload, context);
            // router.reload( { only: [ 'users' ] } )
            closeCollaboratorModal();
        },
        fail: (context) => {
            console.log("fail", context);
        },
    },
});
function addCollaborator() {
    collaboratorForm.submit();
}
function openCollaboratorModal() {
    showCollaboratorModal.value = true;
}
function closeCollaboratorModal() {
    showCollaboratorModal.value = false;
}
const columns = computed(() => {
    return props.project.stages.map((stage) => ({
        id: stage.slug,
        name: stage.name,
    }));
});
const newTaskForms = ref(columns.value.map((column) => ({
    columnId: column.id,
    name: "",
})));
const renderColumns = computed(() => {
    return columns.value.map((column) => ({
        ...column,
        tasks: localProject.value.tasks
            ?.filter((task) => task.status === column.id)
            .sort((a, b) => a.order - b.order),
    }));
});
function updateTasks(updatedTasks) {
    // Update local state
    updatedTasks.forEach((updatedTask) => {
        const task = localProject.value.tasks?.find((t) => t.id === updatedTask.id);
        if (task) {
            task.status = updatedTask.status;
            task.order = updatedTask.order;
        }
    });
    // Sort tasks within each column
    renderColumns.value.forEach((column) => {
        column.tasks.sort((a, b) => a.order - b.order);
    });
    // Send update to server
    router.put(route("projects.tasks.bulk-update", { project: localProject.value.id }), {
        preserveState: true,
        preserveScroll: true,
        preserveUrl: true,
        data: {
            tasks: updatedTasks,
        },
    });
}
// New function to handle task selection
function selectTask(task) {
    selectedTask.value = task;
    isPanelOpen.value = true;
}
// Handle stage deletion
function deleteStage({ column, stageId, tasksToReassign, }) {
    const pendingStage = localProject.value.stages.find((stage) => stage?.name.toLowerCase() === "pending");
    if (!pendingStage) {
        return;
    }
    // Send update to server
    router.delete(route("projects.stages.destroy", {
        project: localProject.value.id,
        stage: stageId,
        column: column,
        tasks: tasksToReassign,
    }), {
        preserveState: false,
        preserveScroll: true,
        preserveUrl: true,
        hooks: {
            success: () => {
                router.post(route("projects.stages.updateOrder", {
                    project: localProject.value,
                }), {
                    data: {
                        columns: localProject.value.stages.map((column, index) => ({
                            id: column.id,
                            order: index,
                        })),
                    },
                });
            },
        },
        data: {
            tasksToReassign,
            newStatus: pendingStage.slug,
        },
    });
}
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("h-[calc(100vh)]") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("hidden") }, });
    (__VLS_ctx.project);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-gradient-to-b from-indigo-800 via-pink-500 to-indigo-200 h-full overflow-scroll pb-12 dark:from-gray-800 dark:to-gray-900") }, });
    if (!__VLS_ctx.user?.is_premium) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 my-6 mx-4 rounded-lg shadow-sm") }, role: ("alert"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm") }, });
        const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ href: ("/upgrade"), ...{ class: ("font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200") }, }));
        const __VLS_2 = __VLS_1({ href: ("/upgrade"), ...{ class: ("font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        __VLS_nonNullable(__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({ ...{ class: ("flex items-center justify-end") }, });
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.TeamMembers;
    /** @type { [typeof __VLS_components.TeamMembers, typeof __VLS_components.TeamMembers, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ collaborators: ((__VLS_ctx.localProject.collaborators)), }));
    const __VLS_8 = __VLS_7({ collaborators: ((__VLS_ctx.localProject.collaborators)), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { form: __VLS_thisSlot } = __VLS_nonNullable(__VLS_11.slots);
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
        /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{ 'onClick': {} }, ...{ class: ("disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500 flex justify-center items-center !rounded-full w-8 h-8 p-1 -m-3 hover:bg-pink-600 transition duration-300") }, disabled: ((!__VLS_ctx.canAddCollaborators)), }));
        const __VLS_14 = __VLS_13({ ...{ 'onClick': {} }, ...{ class: ("disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500 flex justify-center items-center !rounded-full w-8 h-8 p-1 -m-3 hover:bg-pink-600 transition duration-300") }, disabled: ((!__VLS_ctx.canAddCollaborators)), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        let __VLS_18;
        const __VLS_19 = {
            onClick: (__VLS_ctx.openCollaboratorModal)
        };
        let __VLS_15;
        let __VLS_16;
        __VLS_nonNullable(__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    }
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    const __VLS_20 = __VLS_resolvedLocalAndGlobalComponents.KanBanBoard;
    /** @type { [typeof __VLS_components.KanBanBoard, ] } */
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{ 'onUpdateTasks': {} }, ...{ 'onSelectTask': {} }, ...{ 'onAddTask': {} }, ...{ 'onDeleteStage': {} }, columns: ((__VLS_ctx.renderColumns)), projectId: ((__VLS_ctx.localProject.id)), }));
    const __VLS_22 = __VLS_21({ ...{ 'onUpdateTasks': {} }, ...{ 'onSelectTask': {} }, ...{ 'onAddTask': {} }, ...{ 'onDeleteStage': {} }, columns: ((__VLS_ctx.renderColumns)), projectId: ((__VLS_ctx.localProject.id)), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    let __VLS_26;
    const __VLS_27 = {
        onUpdateTasks: (__VLS_ctx.updateTasks)
    };
    const __VLS_28 = {
        onSelectTask: (__VLS_ctx.selectTask)
    };
    const __VLS_29 = {
        onAddTask: (__VLS_ctx.addTask)
    };
    const __VLS_30 = {
        onDeleteStage: (__VLS_ctx.deleteStage)
    };
    let __VLS_23;
    let __VLS_24;
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    const __VLS_31 = __VLS_resolvedLocalAndGlobalComponents.Modal;
    /** @type { [typeof __VLS_components.Modal, typeof __VLS_components.Modal, ] } */
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({ modelValue: ((__VLS_ctx.showCollaboratorModal)), }));
    const __VLS_33 = __VLS_32({ modelValue: ((__VLS_ctx.showCollaboratorModal)), }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { title: __VLS_thisSlot } = __VLS_nonNullable(__VLS_36.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-bold text-indigo-600 dark:text-indigo-400") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.addCollaborator) }, ...{ class: ("mt-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4 text-slate-500") }, });
    const __VLS_37 = __VLS_resolvedLocalAndGlobalComponents.Select;
    /** @type { [typeof __VLS_components.Select, typeof __VLS_components.Select, ] } */
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({ ...{ 'onUpdate:modelValue': {} }, modelValue: ((__VLS_ctx.collaboratorForm.fields.user_id)), ...{ class: ("w-full") }, }));
    const __VLS_39 = __VLS_38({ ...{ 'onUpdate:modelValue': {} }, modelValue: ((__VLS_ctx.collaboratorForm.fields.user_id)), ...{ class: ("w-full") }, }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    let __VLS_43;
    const __VLS_44 = {
        'onUpdate:modelValue': (...[$event]) => {
            __VLS_ctx.collaboratorForm.clearErrors();
        }
    };
    let __VLS_40;
    let __VLS_41;
    const __VLS_45 = __VLS_resolvedLocalAndGlobalComponents.SelectTrigger;
    /** @type { [typeof __VLS_components.SelectTrigger, typeof __VLS_components.SelectTrigger, ] } */
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    const __VLS_51 = __VLS_resolvedLocalAndGlobalComponents.SelectValue;
    /** @type { [typeof __VLS_components.SelectValue, ] } */
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({ placeholder: ("Select a user"), }));
    const __VLS_53 = __VLS_52({ placeholder: ("Select a user"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_nonNullable(__VLS_50.slots).default;
    const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
    const __VLS_57 = __VLS_resolvedLocalAndGlobalComponents.SelectContent;
    /** @type { [typeof __VLS_components.SelectContent, typeof __VLS_components.SelectContent, ] } */
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
    const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
    const __VLS_63 = __VLS_resolvedLocalAndGlobalComponents.SelectLabel;
    /** @type { [typeof __VLS_components.SelectLabel, typeof __VLS_components.SelectLabel, ] } */
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({}));
    const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_nonNullable(__VLS_68.slots).default;
    const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_63, __VLS_65);
    for (const [user] of __VLS_getVForSourceType((__VLS_ctx.users))) {
        const __VLS_69 = __VLS_resolvedLocalAndGlobalComponents.SelectItem;
        /** @type { [typeof __VLS_components.SelectItem, typeof __VLS_components.SelectItem, ] } */
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({ ...{ class: ("") }, key: ((user.id)), value: ((user.id.toString())), }));
        const __VLS_71 = __VLS_70({ ...{ class: ("") }, key: ((user.id)), value: ((user.id.toString())), }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        (user.name);
        __VLS_nonNullable(__VLS_74.slots).default;
        const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71);
    }
    __VLS_nonNullable(__VLS_62.slots).default;
    const __VLS_62 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
    __VLS_nonNullable(__VLS_42.slots).default;
    const __VLS_42 = __VLS_pickFunctionalComponentCtx(__VLS_37, __VLS_39);
    if (__VLS_ctx.collaboratorForm.errors.user_id) {
        const __VLS_75 = __VLS_resolvedLocalAndGlobalComponents.InputError;
        /** @type { [typeof __VLS_components.InputError, ] } */
        // @ts-ignore
        const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ message: ((__VLS_ctx.collaboratorForm.errors.user_id)), ...{ class: ("mt-1 text-xs text-red-600") }, }));
        const __VLS_77 = __VLS_76({ message: ((__VLS_ctx.collaboratorForm.errors.user_id)), ...{ class: ("mt-1 text-xs text-red-600") }, }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { footer: __VLS_thisSlot } = __VLS_nonNullable(__VLS_36.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-end mt-6") }, });
        const __VLS_81 = __VLS_resolvedLocalAndGlobalComponents.PrimaryButton;
        /** @type { [typeof __VLS_components.PrimaryButton, typeof __VLS_components.PrimaryButton, ] } */
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({ ...{ 'onClick': {} }, type: ("submit"), disabled: ((__VLS_ctx.collaboratorForm.processing || !__VLS_ctx.collaboratorForm.fields.user_id)), ...{ class: ("transition disabled:opacity-50 duration-300 ease-in-out transform text-sm px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700") }, }));
        const __VLS_83 = __VLS_82({ ...{ 'onClick': {} }, type: ("submit"), disabled: ((__VLS_ctx.collaboratorForm.processing || !__VLS_ctx.collaboratorForm.fields.user_id)), ...{ class: ("transition disabled:opacity-50 duration-300 ease-in-out transform text-sm px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700") }, }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        let __VLS_87;
        const __VLS_88 = {
            onClick: (__VLS_ctx.addCollaborator)
        };
        let __VLS_84;
        let __VLS_85;
        __VLS_nonNullable(__VLS_86.slots).default;
        const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_81, __VLS_83);
    }
    const __VLS_36 = __VLS_pickFunctionalComponentCtx(__VLS_31, __VLS_33);
    __VLS_styleScopedClasses[''];
    __VLS_styleScopedClasses['h-[calc(100vh)]'];
    __VLS_styleScopedClasses['hidden'];
    __VLS_styleScopedClasses['bg-gradient-to-b'];
    __VLS_styleScopedClasses['from-indigo-800'];
    __VLS_styleScopedClasses['via-pink-500'];
    __VLS_styleScopedClasses['to-indigo-200'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['overflow-scroll'];
    __VLS_styleScopedClasses['pb-12'];
    __VLS_styleScopedClasses['dark:from-gray-800'];
    __VLS_styleScopedClasses['dark:to-gray-900'];
    __VLS_styleScopedClasses['bg-yellow-50'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['border-yellow-200'];
    __VLS_styleScopedClasses['text-yellow-800'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['my-6'];
    __VLS_styleScopedClasses['mx-4'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-sm'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['text-yellow-700'];
    __VLS_styleScopedClasses['underline'];
    __VLS_styleScopedClasses['hover:text-yellow-800'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-200'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['disabled:opacity-50'];
    __VLS_styleScopedClasses['disabled:cursor-not-allowed'];
    __VLS_styleScopedClasses['disabled:bg-slate-500'];
    __VLS_styleScopedClasses['disabled:hover:bg-slate-500'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['!rounded-full'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['p-1'];
    __VLS_styleScopedClasses['-m-3'];
    __VLS_styleScopedClasses['hover:bg-pink-600'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-indigo-600'];
    __VLS_styleScopedClasses['dark:text-indigo-400'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-slate-500'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-red-600'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-end'];
    __VLS_styleScopedClasses['mt-6'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['disabled:opacity-50'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['bg-gradient-to-r'];
    __VLS_styleScopedClasses['from-indigo-400'];
    __VLS_styleScopedClasses['to-indigo-600'];
    __VLS_styleScopedClasses['hover:from-indigo-500'];
    __VLS_styleScopedClasses['hover:to-indigo-700'];
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
            SelectContent: SelectContent,
            SelectValue: SelectValue,
            SelectItem: SelectItem,
            SelectTrigger: SelectTrigger,
            SelectLabel: SelectLabel,
            Select: Select,
            user: user,
            canAddCollaborators: canAddCollaborators,
            localProject: localProject,
            showCollaboratorModal: showCollaboratorModal,
            addTask: addTask,
            collaboratorForm: collaboratorForm,
            addCollaborator: addCollaborator,
            openCollaboratorModal: openCollaboratorModal,
            renderColumns: renderColumns,
            updateTasks: updateTasks,
            selectTask: selectTask,
            deleteStage: deleteStage,
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