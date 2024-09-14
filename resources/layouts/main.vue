<script setup>
import { Button } from '@/components/ui/button'
import useSecurity from '@/composables/security'

const { user, authenticated } = useSecurity()
</script>

<template>
    <main>
        <section>
            <div class="flex justify-between items-center bg-slate-100 p-4">
                <div></div>
                <div>
                    <slot name="actions">
                        <div class="flex gap-2" v-if=" authenticated ">
                            <router-link :href="route('dashboard')">Dashboard</router-link>
                            <router-link method="post" :href="route('logout')" size="md" variant="link">Log Out</router-link>
                        </div>

                        <div class="flex gap-2" v-else>
                            <router-link :href="route('login')">Log In</router-link>
                            <!-- <router-link :href="route('register')">Register</router-link> -->
                        </div>
                    </slot>
                </div>
            </div>
        </section>
        <slot />
    </main>
</template>
