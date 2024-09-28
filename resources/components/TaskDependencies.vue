<template>
  <div class="flex items-start space-x-4">
    <div class="flex-grow">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <!-- Existing dependencies -->
        <TransitionGroup name="list" tag="div" class="flex flex-wrap items-center gap-2">
          <div
            v-for="dep in task.dependencies"
            :key="dep.id"
            class="inline-flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs"
          >
            <v-icon name="bi-check-circle"
              :class="dep.completed ? 'text-green-500' : 'text-gray-400'"
              class="w-3 h-3 mr-1"
            />
            <span @click="openEditPopover(dep)" class="cursor-pointer">{{ dep.title }}</span>
            <v-icon name="io-close-outline"
              @click="$emit('remove-dependency', dep.id)"
              class="w-3 h-3 ml-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            />
          </div>
        </TransitionGroup>

        <!-- Add new dependency button -->
        <Button
          v-if="!isAddingDependency"
          variant="outline"
          size="xs"
          @click="isAddingDependency = true"
        >
          <v-icon name="bi-plus" class="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      <!-- New dependency input -->
      <div v-if="isAddingDependency" class="flex items-center space-x-2">
        <Select v-model="newDependency.type" size="sm">
          <SelectTrigger class="w-[120px] text-xs">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blocked_by">Blocked by</SelectItem>
            <SelectItem value="is_blocking">Is blocking</SelectItem>
          </SelectContent>
        </Select>
        <Command class="w-[150px]">
          <CommandInput placeholder="Search tasks..." class="h-8 text-xs" />
          <CommandList>
            <CommandEmpty>No tasks found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="task in availableTasks"
                :key="task.id"
                @select="selectTask(task)"
                class="text-xs"
              >
                {{ task.title }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <Button @click="addDependency" variant="outline" size="xs">Add</Button>
        <Button @click="isAddingDependency = false" variant="ghost" size="xs">Cancel</Button>
      </div>
    </div>
  </div>

  <!-- Edit popover -->
  <Popover v-if="editingDependency">
    <PopoverTrigger />
    <PopoverContent class="w-[150px]">
      <Select v-model="editingDependency.type" size="sm">
        <SelectTrigger class="text-xs">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blocked_by">Blocked by</SelectItem>
          <SelectItem value="is_blocking">Is blocking</SelectItem>
        </SelectContent>
      </Select>
      <div class="flex justify-end mt-2">
        <Button @click="updateDependency" size="xs">Update</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Dependency {
  id: number
  title: string
  type: 'blocked_by' | 'is_blocking'
  completed: boolean
}

interface Task {
  id: number
  title: string
  dependencies: Dependency[]
}

const props = defineProps<{
  task: Task
  dependencies: Task[]
}>()

const emit = defineEmits(['add-dependency', 'remove-dependency', 'update-dependency'])

const isAddingDependency = ref(false)
const newDependency = reactive({
  type: '' as 'blocked_by' | 'is_blocking',
  taskId: null as number | null
})
const editingDependency = ref<Dependency | null>(null)

const availableTasks = computed(() => {
  return props.dependencies?.filter(t =>
    t.id !== props.task.id &&
    !props.task.dependencies.some(d => d.id === t.id)
  )
})

function addDependency() {
  if (newDependency.type && newDependency.taskId) {
    emit('add-dependency', {
      dependencyId: newDependency.taskId,
      type: newDependency.type
    })
    newDependency.type = '' as 'blocked_by' | 'is_blocking'
    newDependency.taskId = null
    isAddingDependency.value = false
  }
}

function selectTask(task: Task) {
  newDependency.taskId = task.id
}

function openEditPopover(dependency: Dependency) {
  editingDependency.value = { ...dependency }
}

function updateDependency() {
  if (editingDependency.value) {
    emit('update-dependency', {
      dependencyId: editingDependency.value.id,
      type: editingDependency.value.type
    })
    editingDependency.value = null
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

