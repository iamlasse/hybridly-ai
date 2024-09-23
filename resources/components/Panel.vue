<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue';

const { show, close, unmount } = useDialog();
</script>

<template>
    <dialog-root :open=" show ">
        <dialog-portal>
            <dialog-overlay
                class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 " />
            <dialog-content aria-describedby="sheet" class="
                    bg-white border-l shadow-sm
                    h-screen w-2/5 fixed right-0 top-0 z-50
                    data-[state=open]:animate-in data-[state=closed]:animate-out
                    data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
                @interact-outside=" close " @escape-key-down=" close " @pointer-down-outside=" close "
                @after-leave=" unmount ">
                <DialogTitle as-child class="text-lg border-b font-medium text-gray-900 flex items-center justify-between p-4">
                    <header class="flex justify-between">
                        <slot name="title" />
                        <div>
                            <div class="flex items-center">
                                <slot name="actions" :close="close" :show="show" message="Test"/>
                                <DialogClose as-child>
                                    <button @click=" close " class="ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </DialogClose>
                        </div>
                        </div>
                    </header>
                </DialogTitle>
                <DialogDescription as-child>
                        <slot name="description" />
                </DialogDescription>
                <slot :close=" close " />
            </dialog-content>
        </dialog-portal>
    </dialog-root>
</template>

