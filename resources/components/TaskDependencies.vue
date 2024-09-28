<template>
  <div class="flex items-start space-x-4">
    <div class="flex-grow">
      <div class="flex flex-wrap items-center gap-2 mb-2">
        <!-- Existing dependencies -->
        <TransitionGroup name="list" tag="div" class="flex flex-wrap items-center gap-2">
          <div
            v-for="(dep, index) in dependencies"
            :key="dep.id"
            class="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
          >
            <v-icon name="bi-check-circle"
              :class="dep.isComplete ? 'text-green-500' : 'text-gray-400'"
              class="w-4 h-4 mr-2"
            />
            <span @click="openEditPopover(dep)" class="cursor-pointer">{{ dep.taskName }}</span>
            <v-icon name="io-close-outline"
              @click="removeDependency(index)"
              class="w-4 h-4 ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
            />
          </div>
        </TransitionGroup>

        <!-- Add new dependency button -->
        <Button
          v-if="!isAddingDependency"
          variant="outline"
          size="sm"
          @click="isAddingDependency = true"
        >
          <v-icon name="bi-plus" class="w-4 h-4 mr-2" />
          Add dependency
        </Button>
      </div>

      <!-- New dependency input -->
      <div v-if="isAddingDependency" class="flex items-center space-x-2">
        <Select v-model="newDependency.type">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="is blocking">Is blocking</SelectItem>
            <SelectItem value="blocked by">Blocked by</SelectItem>
          </SelectContent>
        </Select>
        <Command class="w-[200px]">
          <CommandInput placeholder="Search tasks..." />
          <CommandList>
            <CommandEmpty>No tasks found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="task in tasks"
                :key="task.id"
                @select="selectTask(task)"
              >
                {{ task.name }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <Button @click="addDependency" variant="outline" size="sm">Add</Button>
        <Button @click="isAddingDependency = false" variant="ghost" size="sm">Cancel</Button>
      </div>
    </div>
  </div>

  <!-- Edit popover -->
  <Popover v-if="editingDependency">
    <PopoverTrigger />
    <PopoverContent class="w-[200px]">
      <Select v-model="editingDependency.type">
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="is blocking">Is blocking</SelectItem>
          <SelectItem value="blocked by">Blocked by</SelectItem>
        </SelectContent>
      </Select>
      <div class="flex justify-end mt-2">
        <Button @click="updateDependency" size="sm">Update</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { CheckIcon, XIcon, PlusIcon } from '@heroicons/vue/solid'

interface Dependency {
  id: number
  taskName: string
  type: 'is blocking' | 'blocked by'
  isComplete: boolean
}

interface Task {
  id: number
  name: string
}

const dependencies = ref<Dependency[]>([])
const isAddingDependency = ref(false)
const newDependency = reactive({
  type: '' as 'is blocking' | 'blocked by',
  taskName: ''
})
const editingDependency = ref<Dependency | null>(null)

// Mock tasks data (replace with actual data source)
const tasks = ref<Task[]>([
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
])

function addDependency() {
  if (newDependency.type && newDependency.taskName) {
    dependencies.value.push({
      id: Date.now(),
      ...newDependency,
      isComplete: false
    })
    newDependency.type = '' as 'is blocking' | 'blocked by'
    newDependency.taskName = ''
    isAddingDependency.value = false
  }
}

function removeDependency(index: number) {
  dependencies.value.splice(index, 1)
}

function selectTask(task: Task) {
  newDependency.taskName = task.name
}

function openEditPopover(dependency: Dependency) {
  editingDependency.value = { ...dependency }
}

function updateDependency() {
  if (editingDependency.value) {
    const index = dependencies.value.findIndex(d => d.id === editingDependency.value?.id)
    if (index !== -1) {
      dependencies.value[index] = editingDependency.value
    }
    editingDependency.value = null
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

