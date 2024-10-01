<script setup lang="ts">
import { ref } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import ShadDatePicker from "@/components/ShadDatePicker.vue";
import { useDebounceFn } from "@vueuse/core";
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const props = defineProps<{
    task: App.Data.TaskData;
    users: App.Data.UserData[];
    project: App.Data.ProjectData;
}>();

const emit = defineEmits<{
    (e: 'update:task', task: App.Data.TaskData): void;
}>();

const assignedUser = ref<string | null>(
    props.task.assigned_to ? props.task.assigned_to.id.toString() : null
);

const showAssigneeInput = ref(false);

const assignUser = (userId: string | null) => {
    assignedUser.value = userId;
    emit('update:task', { ...props.task, assigned_to_id: userId ? parseInt(userId) : null });
};

const debouncedUpdateTask = useDebounceFn((task) => updateTask(task), 500);

const updateDueDate = (newDate: string | null) => {
    debouncedUpdateTask({ id: props.task.id, due_date: newDate });
};

const updateTaskStatus = (newStatus: string) => {
    debouncedUpdateTask({ id: props.task.id, status: newStatus });
};

const updateTask = (taskInformation: Partial<App.Data.TaskData>) => {
    emit('update:task', { ...props.task, ...taskInformation });
};

function userFilterFunction(list: any, searchTerm: string) {
    return list.filter((user: any) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
}
</script>

<template>
    <div class="info p-4">
        <ul class="flex flex-col gap-4">
            <li class="flex gap-2 items-center">
                <h4 class="font-semibold text-sm flex-shrink-0">Assignee:</h4>
                <Popover class="flex" v-model:open="showAssigneeInput">
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="xs" class="font-normal text-sm gap-2 py-2 px-2">
                            <template v-if="props.task.assigned_to">
                                <Avatar size="xs">
                                    <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {{ props.users.find((u) => u.id === props.task.assigned_to.id).name }}
                            </template>
                            <template v-else>
                                <span class="text-sm">Assign user</span>
                            </template>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent side="right" class="w-[300px] p-1" align="start">
                        <Command :filter-function="userFilterFunction">
                            <CommandInput placeholder="Search user..."
                                class="p-2 ring-0 outline-none focus:outline-none active:outline-none focus:ring-0 focus:border-slate-400 active:ring-0 h-auto text-xs" />
                            <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available
                                users</CommandEmpty>
                            <CommandList class="max-h-[300px] overflow-y-auto">
                                <CommandGroup>
                                    <CommandItem v-for="user in props.users" :key="user.id" :value="user"
                                        @select="(v) => {
                                            assignUser(v.detail.value.id);
                                            showAssigneeInput = false;
                                        }" class="text-xs gap-2">
                                        <Avatar size="xs">
                                            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div class="flex items-center">
                                            <span class="flex-grow truncate">{{ user.name }}</span>
                                            <span class="ml-2 text-xs text-gray-500 truncate">{{ user.email }}</span>
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
                <ShadDatePicker v-model="props.task.due_date" @update:model-value="updateDueDate" />
            </li>
            <li class="grid grid-cols-[auto_1fr] items-center gap-2">
                <h4 class="font-semibold text-sm">Projects:</h4>
                <div>
                    <div class="bg-slate-50 px-2 py-1 text-sm inline-flex rounded-md gap-2">
                        <span class="font-semibold text-nowrap flex-1">{{ props.task.project.name }}</span>
                        <Select v-model="props.task.status" class="p-0" @update:model-value="updateTaskStatus">
                            <SelectTrigger
                                class="w-full p-0 hover:bg-slate-200 transition focus:border-0 active:border-0 active:ring-0 focus:ring-0 px-2">
                                <SelectValue placeholder="..." :value="props.task.status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="(status, index) in props.project.stages" :key="status.id"
                                    :value="status.slug">
                                    {{ status.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </li>
            <slot />
        </ul>
    </div>
</template>
