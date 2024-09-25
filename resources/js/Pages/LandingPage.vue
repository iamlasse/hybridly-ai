<script setup lang="ts">
import { Head } from '@hybridly/vue'

defineProps<{
  canLogin: boolean
  canRegister: boolean
  laravelVersion: string
  phpVersion: string
}>()
</script>

<template>
  <Head title="Welcome" />

  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Our App</h1>
    <p class="text-xl mb-8">A powerful tool built with Laravel and Vue.js</p>
    <div class="space-x-4">
      <a v-if="canLogin" href="/login" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Log in
      </a>
      <a v-if="canRegister" href="/register" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Register
      </a>
    </div>
    <div class="mt-8 text-sm text-gray-600">
      <p>Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})</p>
    </div>
  </div>
</template>
