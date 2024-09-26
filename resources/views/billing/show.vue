<script setup lang="ts">

const user = useProperty( 'security.user' );
console.log( user );
const $props = defineProps<{
    invoices: any;
}>();

const form = useForm( {
    method: 'put',
    url: route( 'billing.cancel-subscription' ),
    fields: {
        subscription_id: null
    }
} );

const cancelSubscription = () =>
{
    form.submit();
};
</script>

<template layout="dashboard">
    <div class="container mx-auto px-4 py-8">

        <h1 class="text-3xl font-bold mb-6 text-white">Billing Management</h1>

        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-2xl font-semibold mb-4">Current Plan</h2>
            <p class="text-lg mb-2">
                You are currently on the <span class="font-bold">{{ user?.is_premium ? 'Premium' : 'Free' }}</span>
                plan.
            </p>
            <p v-if=" user && user.activeSubscription && !user.activeSubscription.ends_at "
                class="text-sm text-gray-400">
                Next billing date: {{ new Date( user.activeSubscription?.ends_at ).toLocaleDateString() }}
            </p>




            <div v-if=" user &&user.is_premium ">
                <div v-if=" !user.activeSubscription ">
                    <h3 class="text-xl font-semibold mb-2">Cancel Subscription</h3>
                    <p class="mb-4">If you cancel, your subscription will be active until the end of the current billing
                        period.
                    </p>
                    <primary-button @click=" cancelSubscription "
                        class="bg-red-500 justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        :disabled=" form.processing ">
                        Cancel Subscription
                    </primary-button>
                </div>
                <div v-else>
                    You have cancelled your subscription, and it will end on:
                    {{ new Date( user.activeSubscription.ends_at ).toDateString() }}
                </div>
            </div>

            <div v-else>
                <h3 class="text-xl font-semibold mb-2">Upgrade to Premium</h3>
                <p class="mb-4">Upgrade to our premium plan to unlock all features!</p>
                <span v-if=" user.activeSubscription && user.activeSubscription.ends_at !== null ">
                    You have a cancelled subscription that ends at:
                    {{ new Date( user.activeSubscription.ends_at ).toDateString() }}
                </span>
                <router-link v-else :href=" route( 'upgrade.show' ) "
                    class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded inline-block">
                    Upgrade Now
                </router-link>

            </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
            <h2 class="text-2xl font-semibold mb-4">Billing History</h2>
            <div v-if=" invoices.length > 0 ">
                <table class="w-full">
                    <thead>
                        <tr>
                            <th class="text-left">Date</th>
                            <th class="text-left">Amount</th>
                            <th class="text-left">Status</th>
                            <th class="text-left">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="                     invoice in invoices                     " :key=" invoice.id ">
                            <td>{{ new Date( invoice.created * 1000 ).toDateString() }}</td>
                            <td>{{ invoice.total / 100 }}</td>
                            <td>{{ invoice.status }}</td>
                            <td>
                                <a :href=" invoice.invoice_pdf " target="_blank" class="text-blue-500 hover:underline">
                                    Download
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-else class="text-gray-600">No billing history available.</p>
        </div>
        <BillingPlans />
    </div>
</template>
