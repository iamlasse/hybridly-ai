<script setup lang="ts">
import { ref } from 'vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { useForm } from 'laravel-precognition-vue-inertia';

const form = useForm(
    'post',
    route('projects.store'),
    {
    name: '',
    description: '',
});

const emit = defineEmits(['submit']);

const saveProject = () =>
{
    form.submit( {
        preserveScroll: true,
        onSuccess: () =>
        {
            form.reset( 'name', 'description' );
            emit( 'submit' );
        }

    } );
};
</script>

<template>
    <form class="" @submit.prevent="saveProject">
        <div class="">
            <InputLabel for="name" value="Name" />
            <TextInput id="name" @change="form.validate( 'name' )" v-model="form.name" type="text"
                class="block w-full" />
            <InputError v-if="form.errors.name" :message="form.errors.name" class="mt-1 text-sm text-red-500" />
        </div>

        <div class="mt-4">
            <InputLabel for="description" value="Description" />
            <TextInput id="description" @change="form.validate( 'description' )" v-model="form.description" type="text"
                class="block w-full" />
            <InputError v-if="form.errors.description" :message="form.errors.description"
                class="mt-1 text-sm text-red-500" />
        </div>

        <div class="mt-6">
            <PrimaryButton type="submit" class="w-full" :disabled="form.processing">
                Create project
            </PrimaryButton>
        </div>
    </form>
</template>
