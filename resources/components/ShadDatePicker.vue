<script setup lang="ts">
import { ref, watch } from 'vue'
import { DateFormatter, type DateValue, getLocalTimeZone, parseDate, today, CalendarDate } from '@internationalized/date'
import { CalendarIcon } from '@radix-icons/vue'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const props = defineProps<{
  modelValue: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const selectedDate = ref<DateValue | null>(null)

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    try {
      selectedDate.value = parseDate(newValue.split('T')[0])
    } catch (error) {
      console.error('Error parsing date:', error)
      selectedDate.value = null
    }
  } else {
    selectedDate.value = null
  }
}, { immediate: true })

watch(selectedDate, (newDate) => {
  emit('update:modelValue', newDate ? `${newDate.toString()}T00:00:00.000000Z` : null)
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="none" size="sm" :class="cn(
          'text-left justify-start hover:bg-slate-100 px-1',
    !selectedDate && 'text-muted-foreground',
        )">
                <span class="bg-slate-50 p-[5px] mr-2 rounded-full border-dashed border border-slate-400">
                    <CalendarIcon class=" h-4 w-4" />
                </span>
                <span
                    class="font-normal text-sm">{{ selectedDate ? df.format( selectedDate.toDate( getLocalTimeZone() ) ) : "No due date" }}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="selectedDate" initial-focus :min-value=" today()  " />
        </PopoverContent>
    </Popover>
</template>
