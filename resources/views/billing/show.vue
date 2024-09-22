<script setup lang="ts">

const user = useProperty( 'security.user' );
console.log(user)

const form = useForm({
    method: 'put',
    url: route( 'billing.cancel-subscription' ),
    fields: {
        subscription_id: null
    }
})

const cancelSubscription = () => {
  form.submit()
}
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6">Billing Management</h1>

        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-semibold mb-4">Current Plan</h2>
            <p class="text-lg mb-2">
                You are currently on the <span class="font-bold">{{ user.is_premium ? 'Premium' : 'Free' }}</span> plan.
            </p>
            <p v-if=" user.activeSubscription " class="text-sm text-gray-400">
                Next billing date: {{ new Date( user.activeSubscription.ends_at ).toLocaleDateString() }}
            </p>




        <div v-if="user.is_premium">
            <h3 class="text-xl font-semibold mb-2">Cancel Subscription</h3>
            <p class="mb-4">If you cancel, your subscription will be active until the end of the current billing period.
            </p>
            <button @click="cancelSubscription"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" :disabled="form.processing">
                Cancel Subscription
            </button>
        </div>

        <div v-else>
            <h3 class="text-xl font-semibold mb-2">Upgrade to Premium</h3>
            <p class="mb-4">Upgrade to our premium plan to unlock all features!</p>
            <a :href="route('upgrade.show')"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
                Upgrade Now
            </a>
        </div>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Billing History</h2>
        <!-- Add a table or list of past invoices here -->
        <p class="text-gray-600">No billing history available.</p>
    </div>
    </div>
</template>

