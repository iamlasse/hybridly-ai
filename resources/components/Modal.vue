<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, defineModel, onMounted, onUnmounted } from 'vue';

const isOpen = defineModel({ default: false, required: true });

const props = defineProps({
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    closable: { type: Boolean, default: true }
});

function closeModal() {
    if (props.closable) {
        isOpen.value = false;
    }
}

function handleEscapeKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen.value) {
        closeModal();
    }
}

watch(isOpen, (newVal) => {
    // console.log(newVal ? 'Modal opened' : 'Modal closed');
    if (newVal) {
        window.addEventListener('keyup', handleEscapeKeyup);
    } else {
        document.removeEventListener('keyup', handleEscapeKeyup);
    }
});

onUnmounted(() => {
    document.removeEventListener('keyup', handleEscapeKeyup);
});
</script>

<template>
    <Transition enter-from-class="opacity-0 duration-300" enter-to-class="opacity-100 duration-300">
        <div v-if="isOpen"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            @click.self="closeModal">
            <Transition enter-active-class="transition duration-200 ease-out" enter-class="opacity-0 translate-y-20"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
                leave-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-20">
                <div
                    class="bg-white rounded-lg shadow-lg w-1/3 p-6 relative animate__animated animate__slideInUp animate__faster">
                    <div class="mb-4 flex justify-between items-center">
                        <slot name="title">
                            <h3 class="text-lg font-bold">{{ title }}</h3>
                        </slot>
                        <button v-if=" closable "
                            class=" text-gray-500 hover:text-gray-700 focus:outline-none"
                            @click=" closeModal ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>


                    <div class="">
                        <slot>{{ content }}</slot>
                    </div>
                    <div v-if="$slots.footer" class="mt-4 border-t pt-4 flex justify-end">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
.animate__animated.animate__slideInUp {
  --animate-duration: 0.3s;
}

.animate__animated.animate__slideOutDown {
  --animate-duration: 0.3s;
}
</style>
