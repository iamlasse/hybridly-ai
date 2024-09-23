<script lang="ts" setup>
import { StripeElements, StripeElement } from 'vue-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { defineComponent, ref, onBeforeMount } from 'vue';


const stripeKey = ref( import.meta.env.VITE_STRIPE_KEY ?? 'pk_test_51PuX4TBu5sNug6D6TziFDYJILuqtygnf0Eg0mwArosdV2R8qzT9rtNqRXv3UJtvpSoduDGMak0R6ZQV6xmcCt6ne007THWEznd' ); // test key
const instanceOptions = ref( {} );
const elementsOptions = ref( {} );
const cardOptions = ref( {
    style: {
        base: {
            fontSize: '16px',
            color: '#32325d',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
} );

const stripeLoaded = ref( false );
const card = ref();
const elms = ref();
const errorMessage = ref( '' );

onBeforeMount( () =>
{
    const stripePromise = loadStripe( stripeKey.value );
    stripePromise.then( () =>
    {
        stripeLoaded.value = true;
    } );
} );



const form = useForm( {
    method: 'POST',
    url: route( 'upgrade.process' ),
    fields: {
        payment_method_id: null,
        plan: ''
    },
    hooks: {
        success: () =>
        {
            // console.log( 'Success?' );
            // router.get( route( 'dashboard' ))
        },
        fail: ( context ) =>
        {
            console.error( context );
        }
    }
} );



const postalCodeOptions = ref( {
} );

const pay = async () =>
{
    errorMessage.value = '';
    const stripe = elms.value.instance;
    const cardElement = card.value.stripeElement;

    try
    {
        const { paymentMethod, error } = await stripe.createPaymentMethod( {
            type: 'card',
            card: cardElement,
        } );

        if ( error )
        {
            throw new Error( error.message );
        }

        // Submit the payment method ID to your server
        await form.submitWith( {
            transform: () => ( {
                payment_method_id: paymentMethod.id,
                plan: 'premium'
            } ),
        } );

        // If the form submission is successful, the page will be redirected
        // If not, an error will be thrown and caught in the catch block
    } catch ( error )
    {
        errorMessage.value = error.message;
    }
};
</script>


<template>
    <div class="h-full">
        <section class="container h-full">
            <div class="flex p-12 gap-4 h-full">
                <div class="flex-1 w-1/2 h-full bg-white">
                    <div class="p-6 bg-white rounded-md ">
                        <h4 class="text-xl font-medium text-indigo-600 mb-2">Project Tool Premium Package</h4>
                        <h2 class="text-3xl font-bold mb-4">$29.99/month</h2>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-2">What's included:</h3>
                            <ul class="list-disc list-inside space-y-2 text-gray-700">
                                <li>Unlimited project creation</li>
                                <li>Advanced analytics dashboard</li>
                                <li>AI-powered task prioritization</li>
                                <li>24/7 priority customer support</li>
                                <li>Custom workflow templates</li>
                                <li>Team collaboration features</li>
                            </ul>
                        </div>
                        <div class="bg-indigo-100 p-4 rounded-md">
                            <p class="text-indigo-800 font-medium">🚀 Boost your productivity with our Premium Package!
                                Unlock powerful features designed to streamline your workflow and take your projects to
                                the next level.</p>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-full bg-white p-4">
                    <div class="p-4 bg-white shadow-md rounded-md">
                        <h3 class="text-xl font-medium mb-3">Enter Payment details</h3>
                        <StripeElements v-if=" stripeLoaded " ref="elms" v-slot=" { elements } "
                            :stripe-key=" stripeKey " :instance-options=" instanceOptions "
                            :elements-options=" elementsOptions ">
                            <div class="p-4 border mb-2 rounded-md">
                                <StripeElement ref="card" :elements=" elements " :options=" cardOptions " />
                            </div>
                            <div v-if=" errorMessage " class="text-red-600 mb-2">
                                {{ errorMessage }}
                            </div>
                            <div class="w-full flex">
                                <PrimaryButton class="flex-1 justify-center" @click=" pay "
                                    :disabled=" form.processing ">
                                    {{ form.processing ? 'Processing...' : 'Pay Now' }}
                                </PrimaryButton>
                            </div>
                        </StripeElements>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
