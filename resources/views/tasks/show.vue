<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import type { Comment, Task } from "@/types";
import { useDebounceFn } from "@vueuse/core";
import { useElementVisibility } from "@vueuse/core";
import { DateFormatter, type DateValue } from "@internationalized/date";

// Components
import Panel from "@/components/Panel.vue";
import CommentItem from "@/components/Comment.vue";
import TextInput from "@/components/TextInput.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";
import ShadDatePicker from "@/components/ShadDatePicker.vue";
import Dependencies from "@/components/Dependencies.vue";

// Shadcn | Radix
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxPortal,
  ComboboxRoot,
} from "radix-vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";

const $props = defineProps<{
  task: App.Data.TaskData;
  tasks: App.Data.TaskData[];
  comments: Comment[];
  sub_tasks: App.Data.TaskData[];
  users: App.Data.UserData[];
  project: App.Data.ProjectData;
}>();

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const { toast } = useToast();
const flash = useProperty("flash");

watch(flash, (val: any) => {
  const { error = null, success = null, warning = null, info = null } = val;
  console.log(error, success, warning, info);
  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  if (success) {
    toast({
      title: "...",
      description: success,
      variant: "success",
    });
  }
});

const assignedUser = ref<string | null>(
  $props.task.assigned_to ? $props.task.assigned_to.id.toString() : null
);

const showAssigneeInput = ref(false);

const assignUser = (userId: string) => {
  assignedUser.value = userId;
  router.put(route("tasks.assign", { task: $props.task.id }), {
    data: {
      user_id: userId, // The Command component will only call this when a user is selected
    },
    preserveState: false,
    preserveScroll: true,
  });
};

const debouncedUpdateTask = useDebounceFn((task) => updateTask(task), 500); // Adjust

const updateDueDate = (newDate: string | null) => {
  console.log("update due date: ", newDate);
  debouncedUpdateTask({
    id: $props.task.id,
    due_date: newDate ? new Date(newDate).toISOString() : null,
  });
};

const updateTaskStatus = (newStatus: string) => {
  debouncedUpdateTask({ id: $props.task.id, status: newStatus });
};

const subtasks = computed(() => $props.sub_tasks || []);
const newSubtask = ref("");

const addSubtask = (tasks: App.Data.TaskData[], index: number) => {
  if (newSubtask.value.trim()) {
    const newTask = newSubtask.value;
    createSubTask(newTask, () => {
      newSubtask.value = "";
      const previousId = $props.task.sub_tasks
        ? $props.task.sub_tasks.at(-1).id
        : $props.task.id;
    });
  }
};

const handleKeySubtaskDown = (event: KeyboardEvent, index: number) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (index === subtasks.value.length) {
      addSubtask(subtasks.value[index], index);
    } else {
      // Focus the next input
      const nextInput = document.querySelector(
        `input[data-index="${index + 1}"]`
      ) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }
};

const target = ref(null);
const targetIsVisible = useElementVisibility(target);

const commentForm = useForm({
  method: "POST",
  url: route("task.comments.store", { task: $props.task }),
  fields: {
    body: "",
    commentable_id: $props.task.id,
    commentable_type: "task",
  },
  hooks: {
    success: (payload: any, context: any) => {
      console.log("comment added", payload, context);
      commentForm.reset();
    },
  },
});

const onSubmit = () => {
  commentForm.submitWith({
    transform: (fields) => ({
      ...fields,
      body: JSON.stringify(fields.body),
    }),
  });
};

const createSubTask = (task: App.Data.TaskData, cb = () => {}) => {
  handleUpdate(
    $props.task.id,
    {
      subtasks: [task],
    },
    cb
  );
};

const updateTask = (taskInformation: App.Data.TaskData) => {
  const {
    description = null,
    title = null,
    id = null,
    due_date = null,
    status = null,
  } = taskInformation;
  const data = {};

  if (description) {
    data["description"] = JSON.stringify(description);
  }

  if (title) {
    data["title"] = title;
  }

  if (due_date !== false || due_date !== null) {
    data["due_date"] = due_date === false ? false : due_date;
  }

  if (status) {
    data["status"] = status;
  }

  handleUpdate(id, data);
};

watch($props.task.description, (newDescription) => {
  debouncedUpdateTask({ id: $props.task.id, description: newDescription });
});

const handleUpdate = (id: string | number, data = {}, cb = () => {}) => {
  router.put(route("tasks.update", { task: id }), {
    preserveState: false,
    data,
    hooks: {
      success: () => router.reload({ only: ["sub_tasks", "task", "comments"] }),
      after: () => cb(),
    },
  });
};

const showSubtasks = ref(false);

const deleteSubtask = (subtaskId: string) => {
  router.delete(route("tasks.destroy", { task: subtaskId }), {
    preserveState: false,
    preserveScroll: true,
    hooks: {
      success: () => {
        router.reload({ only: ["sub_tasks", "task", "comments"] });
      },
      error: (error) => {
        console.error("Failed to delete subtask:", error);
        alert("Failed to delete subtask. Please try again.");
      },
    },
  });
};

const contextMenu = ref<{
  show: boolean;
  x: number;
  y: number;
  subtaskId: number | null;
}>({ show: false, x: 0, y: 0, subtaskId: null });

const showContextMenu = (event: MouseEvent, subtaskId: number | null) => {
  event.preventDefault();
  contextMenu.value = {
    show: true,
    x: event.clientX,
    y: event.clientY,
    subtaskId,
  };
};

const hideContextMenu = () => {
  contextMenu.value.show = false;
};

const toggleSubtaskCompletion = (subtaskId: number) => {
  router.post(route("tasks.toggle-completion", { task: subtaskId }), {
    preserveState: false,
    preserveScroll: true,
  });
};

const toggleMainTaskCompletion = () => {
  router.post(route("tasks.toggle-completion", { task: $props.task.id }), {
    preserveState: false,
    preserveScroll: true,
    hooks: {
      success: () => {
        router.reload({ only: ["task"] });
      },
    },
  });
};

// const dependencySearchTerm = ref("");

const addDependency = ({
  id: dependencyId,
  type,
}: {
  id: number;
  type: string;
}) => {
  if (!dependencyId) return; // Prevent adding empty dependencies
  router
    .put(route("tasks.add-dependency", { task: $props.task.id }), {
      data: {
        dependency_id: dependencyId,
        type,
      },
      preserveState: false,
      preserveScroll: true,
    })
    .then(() => {
      router.reload({ only: ["task"] }); // Reload the task data
    })
    .catch((error) => {
      console.error("Error adding dependency:", error);
      // You can add error handling here, such as showing an error message to the user
    });
};

const updateDependency = ({
  id: dependencyId,
  type,
}: {
  id: number | string;
  type: string;
}) => {
  if (!dependencyId) return;
  router.put(route("tasks.update-dependency", { task: $props.task.id }), {
    data: {
      dependency_id: dependencyId,
      type,
    },
    preserveState: false,
    preserveScroll: true,
  });
};

const removeDependency = (dependencyId: string | number) => {
  router.put(route("tasks.remove-dependency", { task: $props.task.id }), {
    data: { dependency_id: dependencyId },
    preserveState: false,
    preserveScroll: true,
  });
};

const availableTasks = computed(() => {
  // Ensure $props.tasks is defined and is an array
  if (!Array.isArray($props.tasks)) {
    console.warn("$props.tasks is not an array:", $props.tasks);
    return [];
  }

  // Filter out tasks that are already dependencies and the current task
  const filteredTasks = $props.tasks.filter(
    (t) =>
      t.id !== $props.task.id &&
      !$props.task.dependencies?.some((d: App.Data.TaskData) => d.id === t.id)
  );

  // Apply search filter
//   if (dependencySearchTerm.value) {
//     return filteredTasks.filter(
//       (t) =>
//         t.title
//           .toLowerCase()
//           .includes(dependencySearchTerm.value.toLowerCase()) ||
//         (t.project &&
//           t.project.name &&
//           t.project.name
//             .toLowerCase()
//             .includes(dependencySearchTerm.value.toLowerCase()))
//     );
//   }

  return filteredTasks;
});

function userFilterFunction(list: any, searchTerm: string) {
  return list.filter((user: any) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

// Add this to check the structure of $props.tasks
onMounted(() => {
  document.addEventListener("click", hideContextMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", hideContextMenu);
});
</script>

<template>
    <Panel>
        <template #title>
            <header class="">
                <div v-if="targetIsVisible" class="flex items-center justify-between">
                    <Button size="sm" :variant="task.completed ? 'secondary' : 'outline'"
                        @click="toggleMainTaskCompletion">
                        <v-icon :name="
                !task.completed ? 'bi-check-circle' : 'io-close-circle-outline'
              " class="mr-1"></v-icon>
                        {{ task.completed ? "Mark Incomplete" : "Mark Complete" }}
                    </Button>
                    <div class="actions ml-auto"></div>
                </div>
                <div v-else>
                    <h3>{{ task.title }}</h3>
                </div>
            </header>
        </template>
        <template #actions="{ close }">
            <h3 class="font-semibold">...</h3>
        </template>
        <div class="grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll">
            <header>
                <div class="description p-2" ref="target">
                    <TextInput
                        class="border border-transparent transition-all hover:border-indigo-500 w-full !shadow-none text-xl font-semibold"
                        @change="
              debouncedUpdateTask({
                id: task.id,
                title: task.title,
                description: null,
              })
            " :value="task.title" v-model="task.title" />
                </div>

                <div class="info p-4">
                    <ul class="flex flex-col gap-4">
                        <li class="flex gap-2 items-center">
                            <h4 class="font-semibold text-sm flex-shrink-0">Assignee:</h4>
                            <Popover class="flex">
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" class="font-normal text-sm gap-2 p-1">
                                        <template v-if="task.assigned_to_id">
                                            <Avatar size="xs">
                                                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            {{ users.find((u) => u.id === task.assigned_to_id).name }}
                                        </template>
                                        <template v-else>
                                            <span class="text-sm">Assign user</span>
                                        </template>
                                    </Button>
                                    <v-icon v-if="task.assigned_to_id" name="io-close-outline"
                                        class="hover:bg-slate-100 hover:cursor-pointer"
                                        @click="assignUser(null)"></v-icon>
                                </PopoverTrigger>
                                <PopoverContent class="w-[300px] p-0" align="start">
                                    <Command :filter-function="userFilterFunction">
                                        <CommandInput placeholder="Type a command or search..." />
                                        <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available users
                                        </CommandEmpty>
                                        <CommandList class="max-h-[300px] overflow-y-auto">
                                            <CommandGroup>
                                                <CommandItem v-for="user in users" :key="user.id" :value="user" @select="
                            (v) => {
                              assignUser(v.detail.value.id);
                              showAssigneeInput.value = false;
                            }
                          " class="text-xs gap-2">
                                                    <Avatar size="xs">
                                                        <AvatarImage src="https://github.com/radix-vue.png"
                                                            alt="@radix-vue" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    <div class="flex items-center">
                                                        <span class="flex-grow truncate">{{
                              user.name
                            }}</span>
                                                        <span class="ml-2 text-xs text-gray-500 truncate">{{
                              user.email
                            }}</span>
                                                    </div>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </li>
                        <li class="flex gap-2 items-center">
                            <h4 class="font-semibold text-sm flex-shrink-0">Due date:</h4>
                            <ShadDatePicker v-model="task.due_date" @update:model-value="updateDueDate" />
                        </li>
                        <li class="grid grid-cols-[auto_1fr] items-center gap-2">
                            <h4 class="font-semibold text-sm ">Projects:</h4>
                            <div>
                                <div class="bg-slate-50 px-2 py-1 text-sm inline-flex rounded-md gap-2">
                                    <span class="font-semibold text-nowrap flex-1">{{ task.project.name }} </span>
                                    <Select v-model="task.status" class="p-0" @update:model-value="updateTaskStatus">
                                        <SelectTrigger
                                            class="w-full p-0 hover:bg-slate-200 transition focus:border-0 active:border-0 active:ring-0 focus:ring-0 px-2">
                                            <SelectValue placeholder="..." :value="task.status" />
                                        </SelectTrigger>
                                        <SelectContent class="">
                                            <SelectItem class="" v-for="(status, index) in project.stages"
                                                :key="status.id" :value="status.slug">
                                                {{ status.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </li>
                        <li class="grid gap-2 grid-cols-[auto_1fr]">
                            <h4 class="font-semibold text-sm">Dependencies:</h4>
                            <Dependencies :task="task" :dependencies="availableTasks" @add-dependency="addDependency"
                                @update-dependency="updateDependency" @remove-dependency="removeDependency" />
                        </li>
                        <li>
                            <h4 class="font-semibold text-sm">Fields:</h4>
                        </li>
                        <li>
                            <div class="">
                                <InputLabel value="Description" class="ml-2 mb-1" />
                                <TiptapEditor :model-value="task.description" @update:model-value="
                    (modelValue) =>
                      debouncedUpdateTask({
                        id: task.id,
                        description: modelValue,
                      })
                  " class="w-full" />
                            </div>
                        </li>
                        <li>
                            <div v-if="subtasks.length > 0 || showSubtasks">
                                <h4 class="font-semibold text-sm">Subtasks:</h4>
                                <ul class="mt-2">
                                    <li v-for="(subtask, index) in subtasks" :key="index"
                                        class="flex items-center mb-2 group"
                                        @contextmenu="showContextMenu($event, subtask.id)">
                                        <Button @click="toggleSubtaskCompletion(subtask.id)"
                                            class="mr-2 p-0 bg-transparent hover:bg-transparent" variant="ghost"
                                            size="sm">
                                            <v-icon :name="
                          subtask.completed
                            ? 'bi-check-circle-fill'
                            : 'bi-check-circle'
                        " :class="{ 'text-gray-400': subtask.completed }"></v-icon>
                                        </Button>
                                        <TextInput v-model="subtask.title" @update:modelValue="
                        (modelValue) =>
                          debouncedUpdateTask({
                            id: subtask.id,
                            title: modelValue,
                          })
                      " :data-index="index" class="border rounded px-2 py-1 mr-2 flex-grow" :class="{
                        'bg-gray-200 !text-gray-400': subtask.completed,
                      }" />
                                    </li>
                                    <li class="flex items-center">
                                        <v-icon name="bi-check-circle" class="mr-2"></v-icon>
                                        <TextInput v-model="newSubtask"
                                            @keydown="(e) => handleKeySubtaskDown(e, subtasks.length)"
                                            :data-index="subtasks.length" placeholder="Enter new subtask"
                                            class="border rounded px-2 py-1 mr-2 flex-grow" />
                                    </li>
                                </ul>
                                <div v-if="contextMenu.show" :style="{
                    position: 'fixed',
                    top: `${contextMenu.y}px`,
                    left: `${contextMenu.x}px`,
                  }" class="bg-white shadow-md rounded-md p-2 w-72 z-50">
                                    <Button variant="ghost" size="xs" @click="deleteSubtask(contextMenu.subtaskId)"
                                        class="w-full flex gap-2 text-left justify-start">
                                        <v-icon name="bi-trash-fill"></v-icon>
                                        Delete task
                                    </Button>
                                    <!-- <Button size="xs" variant="ghost"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                                        @click="deleteSubtask( subtask.id )">
                                    </Button> -->
                                </div>
                            </div>
                            <Button v-else size="sm" @click="showSubtasks = true">+ Add subtasks</Button>
                        </li>
                    </ul>
                </div>
            </header>

            <div class="comments pb-4 bg-slate-100">
                <header class="border-b px-4 mb-3 flex items-center gap-4">
                    <h2 class="font-semibold text-sm border-b-slate-500 border-b-2 pb-2 pt-2">
                        Comments
                    </h2>
                    <h2 class="font-semibold text-sm pb-2 pt-2">All Activity</h2>
                </header>
                <section class="px-4">
                    <div class="flex items-start gap-2 mb-4">
                        <Avatar>
                            <v-icon name="bi-person-circle"></v-icon>
                        </Avatar>
                        <span>Created by: Test User <small>0 seconds ago</small></span>
                    </div>
                    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
                </section>
            </div>
            <div class="bg-slate-100 border-t pb-4 sticky bottom-0">
                <div class="p-2">
                    <form @submit.prevent="onSubmit">
                        <div class="flex flex-col gap-2 p-2">
                            <span class="text-sm font-semibold">Add Comment</span>
                            <TiptapEditor class="border-0 w-full" type="text" name="body"
                                v-model="commentForm.fields.body" />
                            <div class="actions flex justify-between items-center">
                                <p class="text-sm">Add comment</p>
                                <primary-button size="sm" type="submit">Submit</primary-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Panel>
</template>
