<script setup lang="ts">
import { ref } from 'vue';

const form = useForm( {
    method: 'post',
    url: route( 'projects.store' ),

    preserveScroll: true,
    hooks: {
        success: () =>
        {
            form.reset();
            emit( 'submit' );
        }
    },
    fields: {
        name: '',
        description: '',
    }
} );

const emit = defineEmits( [ 'submit' ] );

const saveProject = () =>
{
    form.submit();
};
</script>

<template>
    <form class="" @submit.prevent=" saveProject ">
        <div class="">
            <InputLabel for="name" value="Name" />
            <TextInput id="name" v-model=" form.fields.name " type="text" class="block w-full" />
            <InputError v-if=" form.errors.name " :message=" form.errors.name " class="mt-1 text-sm text-red-500" />
        </div>

        <div class="mt-4">
            <InputLabel for="description" value="Description" />
            <TextInput id="description" v-model=" form.fields.description " type="text" class="block w-full" />
            <InputError v-if=" form.errors.description " :message=" form.errors.description "
                class="mt-1 text-sm text-red-500" />
        </div>

        <div class="mt-6">
            <PrimaryButton type="submit" class="w-full" :disabled=" form.processing ">
                Create project
            </PrimaryButton>
        </div>
    </form>
</template>
