<script setup lang="ts">
import type { Comment, Task } from "@/types";
import Panel from "@/components/Panel.vue";
import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput.vue';
const props = defineProps<{
    task: App.Data.TaskData;
    comments: Comment[];
}>();

const commentForm = useForm( {
    method: "POST",
    url: route( "task.comments.store", { task: props.task } ),
    fields: {
        body: "",
    },
    hooks: {
        success: ( payload: any, context: any ) =>
        {
            console.log( "comment added", payload, context );
        },
    },
} );

const onSubmit = () =>
{
    commentForm.submitWith( {
        preserveState: false,
    } );
};

const updateTaskTitle = ( title: string ) =>
{
    router.put( route( 'tasks.update', { task: props.task } ), {
        data: {
            title
        }
    } );
};

const updateTask = ( { description } ) =>
{
    router.put( route( 'tasks.update', { task: props.task } ), {
        data: {
            description
        }
    } );
};
</script>

<template>
    <Panel>
        <template #title>
            <Button size="sm">Mark Complete</Button>
        </template>
        <template #actions=" { close } ">
            <h3 class="font-semibold">...</h3>
        </template>
        <div class="grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll p-4">
            <header>
                <TextInput
                    class="border border-transparent transition-all hover:border-indigo-500 w-full !shadow-none text-xl font-semibold"
                    @change="updateTaskTitle( task.title )" :value=" task.title " v-model=" task.title " />
                <div class="p-4">
                    <InputLabel value="Description" class="ml-2 mb-1" />
                    <TextArea @change=" updateTask( task )" v-model=" task.description " class="w-full p-3" rows="8"
                        type="textarea" />
                </div>
            </header>
            <div class="comments pb-4">
                <CComment v-for="                          comment in comments                          "
                    :key=" comment.id " :comment=" comment " />
            </div>
            <div class="bg-slate-100 border-t -mr-4 -ml-4 sticky bottom-0">
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
        </div>
    </Panel>
</template>
