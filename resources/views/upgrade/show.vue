<script setup>
import { ref } from 'vue';

const selectedPlan = ref( 'free' );

const handleNavigate = async ( e ) =>
{
    e.preventDefault();

    if ( selectedPlan.value === 'free' )
    {
        // Handle free plan selection
        return router.get( route( 'dashboard' ) );
    }

    if ( selectedPlan.value === 'enterprise' )
    {
        // Handle enterprise plan selection (e.g., redirect to contact page)
        return router.get( route( 'contact' ) );
    }

    if ( selectedPlan.value === 'premium' )
    {
        router.get( route( 'upgrade.checkout' ) );
    }
};
</script>

<template>
    <section class="max-w-4xl mx-auto mt-10">
        <h2 class="text-3xl font-bold mb-6 text-gray-800 text-center">Choose Your Plan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div v-for="                    plan in [ 'free', 'premium', 'enterprise' ]                    " :key=" plan "
                class="border rounded-lg p-6 flex flex-col items-center"
                :class=" { 'border-indigo-500': selectedPlan === plan } ">
                <h3 class="text-xl font-semibold mb-4 capitalize">{{ plan }}</h3>
                <ul class="mb-6 text-sm">
                    <li v-if=" plan === 'free' ">• Basic features</li>
                    <li v-if=" plan === 'premium' ">• All features</li>
                    <li v-if=" plan === 'premium' ">• Priority support</li>
                    <li v-if=" plan === 'enterprise' ">• Custom solutions</li>
                    <li v-if=" plan === 'enterprise' ">• Dedicated support</li>
                </ul>
                <PrimaryButton @click="selectedPlan = plan" class="px-4 py-2 rounded-md text-sm font-medium"
                    :class=" selectedPlan === plan ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700' ">
                    Select {{ plan }}
                </PrimaryButton>
            </div>
        </div>
        <div v-if=" selectedPlan === 'free' " class="text-center">
            <p class="mb-4">You've selected the Free plan. No payment is required.</p>
            <PrimaryButton @click=" handleNavigate ">
                Continue with Free Plan
            </PrimaryButton>
        </div>
        <div v-if=" selectedPlan === 'premium' " class="text-center">
            <p class="mb-4">You've selected the premium plan. You will be sent to the checkout.</p>
            <PrimaryButton @click=" handleNavigate ">
                Continue with Premium
            </PrimaryButton>
        </div>
        <div v-if=" selectedPlan === 'enterprise' " class="text-center">
            <p class="mb-4">For Enterprise solutions, please contact our sales team.</p>
            <PrimaryButton @click=" handleNavigate ">
                Contact Sales
            </PrimaryButton>
        </div>
    </section>
</template>
