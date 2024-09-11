<template>
    <dialog-root :open=" show ">
        <dialog-portal>
            <dialog-overlay
                class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

            <dialog-content
            aria-describedby="sheet"
            class="
            p-6
                    h-screen w-1/4 fixed right-0 p-4 top-0 bg-slate-300 z-50
                    data-[state=open]:animate-in data-[state=closed]:animate-out
                    data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
                @interact-outside=" close " @escape-key-down=" close " @pointer-down-outside=" close "
                @after-leave=" unmount ">
                <div class="bg-white dark:bg-slate-950 h-full rounded-lg p-6 shadow-lg overflow-y-scroll">
                    <header class="flex items-center justify-between">
                        <dialog-title as-child as="h3" class="text-lg font-medium text-gray-900">TEST</dialog-title>
                        <dialog-close as-child>
                            <slot name="close" :close=" close ">
                                <button @click=" close ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </slot>
                        </dialog-close>
                    </header>
                    <slot :close=" close " />
                </div>
            </dialog-content>
        </dialog-portal>
    </dialog-root>
</template>

<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'radix-vue'

const { show, close, unmount } = useDialog();
</script>
