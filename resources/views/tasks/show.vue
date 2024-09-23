<script setup lang="ts">
import type { Comment, Task } from '@/types';
import CComment from '@/components/CComment.vue';
import Dialog from '@/components/rdialog.vue';
const props = defineProps<{
    task: Task;
    comments: Comment[];
}>();

const commentForm = useForm( {
    method: 'POST',
    url: route( 'task.comments.store', { task: props.task } ),
    fields: {
        body: ''
    },
    hooks: {
        success: ( payload: any, context: any ) =>
        {
            console.log( 'comment added', payload, context );
        }
    }
} );

const onSubmit = () =>
{
    commentForm.submitWith( {
        preserveState: false
    } );
};
</script>

<template>
    <Dialog>
        <template #title>
            <h3 class="font-semibold">{{ task.title }}</h3>
        </template>
        <div class="grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll p-6">

            <div class="comments pb-4">
                <CComment v-for="               comment in comments               " :key=" comment.id "
                    :comment=" comment " />
            </div>
            <div class="bg-slate-100 border-t -mr-6 -ml-6  sticky bottom-0">
                <div class="   ">
                    <form @submit.prevent=" onSubmit ">
                        <div class="flex flex-col gap-2 p-2">
                            <TextInput class="border-0 w-full" type="text" name="body"
                                v-model=" commentForm.fields.body " />
                            <div class="actions flex justify-between items-center">
                                <p class="text-sm">Add comment</p>
                                <primary-button size="sm" type="submit">Submit</primary-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- <div class="mt-auto"></div> -->

        </div>
    </Dialog>
</template>
