<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Comment, Task } from '@/types';
import TiptapEditor from '@/components/TiptapEditor.vue';

interface Owner
{
    id: string;
}

const props = defineProps<{
    comments: Comment[],
    owner: Task;
}>();

const emit = defineEmits( [ 'addedComment' ] );

const comments = ref( props.comments );

onMounted( () =>
{
    // console.log(comments.value)
} );


const commentForm = useForm( {
    method: 'POST',
    url: route( 'task.comments.store', { task: props.owner?.id } ),
    fields: {
        comment: {}
    }
} );

// const loadedTask = ref<Task|null>()

const addComment = () => {
    const commentBody = JSON.stringify(commentForm.fields.comment);

    router.post( route( 'task.comments.store', { task: props.owner?.id } ), {
        data: {
            body: commentBody,
            commentable_id: props.owner?.id,
            commentable_type: 'task',
        },
        preserveState: true,
        replace: true,
        preserveScroll: true,
        hooks: {
            success: () => {
                commentForm.reset();
                router.get( route( 'tasks.show', { task: props.owner?.id } ), {
                    replace: false,
                    only: [ 'comments' ]
                } );
            }
        }
    } );
};
</script>

<template>
    <div class="space-y-4">
        <form @submit.prevent="addComment">
            <div class="mt-2">
                <TiptapEditor v-model="commentForm.fields.comment" />
            </div>

            <div class="mt-2 flex justify-end">
                <button :disabled="!commentForm.isDirty" @click="addComment" type="button"
                    class="inline-flex items-center rounded-md border border-transparent disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Add Comment
                </button>
            </div>
        </form>
        <CComment v-for="    comment in comments    " :key=" comment.id " :comment=" comment " />
    </div>
</template>
