<script setup lang="ts">
import Dialog from '@/components/sdialog.vue'

const props = defineProps({
    task: Object,
    comments: Array
} )

const commentForm = useForm( {
    method: 'POST',
    url: route( 'task.comments.store', { task: props.task} ),
    fields: {
        body: ''
    },
} );

const onSubmit = () => {
    commentForm.submit();
}
</script>

<template>
    <Dialog>

        <form @submit.prevent="onSubmit">
            <input type="text" name="body" v-model="commentForm.fields.body">
            <button type="submit">Submit</button>
        </form>
        <div>
            {{ task.title }}
            <ul>
                <li class="truncate" v-for=" comment in comments " :key="comment.id">{{ comment.body }}</li>
            </ul>
</div>
</Dialog>
</template>
