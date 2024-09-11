<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Modal from './Modal.vue';
import InputLabel from './InputLabel.vue';
import TextInput from './TextInput.vue';
import InputError from './InputError.vue';
import PrimaryButton from './PrimaryButton.vue';

const show = defineModel({ default: false, required: true });

const emit = defineEmits(['close']);

const form = useForm({
    name: '',
    description: '',
});

const closeModal = () => {
    form.reset();
    emit('close');
};

const createProject = () => {
    form.post(route('projects.store'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
    });
};
</script>

<template>
    <Modal v-model="show" @close="closeModal" closable="false">
        <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Create New Project</h2>
            <form @submit.prevent="createProject" class="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Project Name" />
                    <TextInput
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.name"
                        required
                        autofocus
                    />
                    <InputError :message="form.errors.name" class="mt-2" />
                </div>

                <div>
                    <InputLabel for="description" value="Description" />
                    <TextInput
                        id="description"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.description"
                    />
                    <InputError :message="form.errors.description" class="mt-2" />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                        Create Project
                    </PrimaryButton>
                </div>
            </form>
        </div>
    </Modal>
</template>
