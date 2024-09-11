<script setup lang="ts">
import Dialog from '@/components/sdialog.vue';
import
    {
    Button
} from '@/components/ui/button'
const props = defineProps( {
    task: Object,
    comments: Array
} );

const commentForm = useForm( {
    method: 'POST',
    url: route( 'task.comments.store', { task: props.task } ),
    fields: {
        body: ''
    },
} );

const onSubmit = () =>
{
    commentForm.submit();
};
</script>

<template>
    <Dialog>
        <div class="flex flex-col h-full justify-between overflow-y-scroll p-6">
            <div class="content flex-1 ">
                <header>
                    <h3 class="font-semibold">{{ task.title }}</h3>
                </header>
            </div>

            <div class="comments pb-4">
                <CComment v-for="     comment in comments     " :key=" comment.id " :comment=" comment " />
            </div>
            <div class="bg-slate-50 border-t -ml-6 -mr-6 px-6 -mb-6 py-2">


                <div class="  ">
                    <form @submit.prevent=" onSubmit ">
                        <div class="flex flex-col gap-2 p-2">
                            <TextInput class="border-0 w-full" type="text" name="body"
                                v-model=" commentForm.fields.body " />
                            <div class="actions flex justify-between items-center">
                                <p class="text-sm">Add comment</p>
                                <Button size="sm" type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                    <div>


                    </div>
                </div>
            </div>
            <!-- <div class="mt-auto"></div> -->

        </div>
    </Dialog>
</template>
