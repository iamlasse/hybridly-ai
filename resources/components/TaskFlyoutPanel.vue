<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import { Task } from '@/types';
import { CoOpenstreetmap } from 'oh-vue-icons/icons';

const props = defineProps < {
    task: Task | null;
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

const panelRef = ref<HTMLElement | null>( null );

const commentForm = useForm( {
    comment: ''
} )

// const loadedTask = ref<Task|null>()

const addComment = () =>
{
    router.post( route( 'comments.store' ), {
        body: commentForm.comment,
        commentable_id: props.task?.id,
        commentable_type: 'task',
    }, {
        // preserveState: false,
        replace: false,
        preserveScroll: true,
        onSuccess: () =>
        {
            commentForm.reset()
            router.reload()

        }
    } );
}

const closeFlyout = () => {
  emit('close');
};

const handleOutsideClick = (event: MouseEvent) => {
  if (panelRef.value && !panelRef.value.contains(event.target as Node)) {
    closeFlyout();
  }
};

onMounted(() => {
    document.addEventListener( 'keydown', handleEscapeKey );


} );

// watchEffect( async () =>
// {
//     if(!props.task) return
//     const task = await fetch( route( 'tasks.show', { task: props.task?.id } ) ).then( res => res.json() )

//     loadedTask.value = task
//     // router.get( route( 'tasks.show', props.task?.id ?? 528 ), {
//     //     preserveState: true,
//     //     replace: false
//     // } );
// })

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
  document.removeEventListener('click', handleOutsideClick);
});

// watch(() => props.isOpen, (newValue) => {
//   if (newValue) {
//     // Add click listener when panel is opened
//     setTimeout(() => {
//       document.addEventListener('click', handleOutsideClick);
//     }, 0);
//   } else {
//     // Remove click listener when panel is closed
//     document.removeEventListener('click', handleOutsideClick);
//   }
// });

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeFlyout();
  }
};

</script>

<template>
    <div ref="panelRef"
        class="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto"
        :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }" @click.stop>
        <div class="p-6 flex items-center justify-between">
            <slot name="header" class="order-first">{{ task?.name }}</slot>
            <button @click="closeFlyout" class=" text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

        </div>
        <div class="p-6 text-gray-500">
            <slot />

            <div>
                <div class="flex justify-between">
                    <label class="block text-sm font-medium text-gray-700">Comments</label>
                </div>

                <form @submit.prevent="addComment">
                    <div class="mt-2">
                        <textarea v-model=" commentForm.comment " rows="3"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Leave a comment"></textarea>
                    </div>

                    <div class="mt-2 flex justify-end">
                        <button @click=" addComment " type="button"
                            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Add Comment
                        </button>
                    </div>

                </form>
                <ul role="list" class="mt-4 divide-y divide-gray-200">
                    <li v-for="  comment in task?.comments  " :key=" comment.id " class="py-4">
                        <div class="flex space-x-3">
                            <div class="flex-1 space-y-1">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium">
                                        {{ comment.user?.name }}</h3>
                                    <p class="text-sm text-gray-500">
                                        {{ comment.readable_created_time }}</p>
                                </div>
                                <p class="text-sm text-gray-500">{{ comment.body }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
