<script setup lang="ts">


const stripe = Stripe( '{{ env('STRIPE_KEY') }}' );
const elements = stripe.elements();
const cardElement = elements.create( 'card' );
cardElement.mount( '#card-element' );

const cardHolderName = document.getElementById( 'card-holder-name' );
const cardButton = document.getElementById( 'card-button' );
const form = ref( 'payment-form' );

form.addEventListener( 'submit', async ( e ) =>
{
    e.preventDefault();
    const { paymentMethod, error } = await stripe.createPaymentMethod( 'card', cardElement, {
        billing_details: { name: cardHolderName.value }
    } );

    if ( error )
    {
        // Display error.message to the user
        console.error( error );
    } else
    {
        // Send paymentMethod.id to your server
        const token = document.querySelector( 'meta[name="csrf-token"]' )?.getAttribute( 'content' );
        const response = await fetch( route( 'upgrade.process' ), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify( {
                payment_method_id: paymentMethod.id,
            } )
        } );

        const result = await response.json();

        if ( result.requires_action )
        {
            const { error } = await stripe.handleCardAction( result.payment_intent_client_secret );
            if ( error )
            {
                console.error( error );
            } else
            {
                // The card action has been handled
                // The payment was successful
            }
        } else if ( result.success )
        {
            // The payment was successful
            window.location.href = route( 'dashboard' );
        }
    }
} );
</script>

<template>
    <section>
        <h2 class="text-2xl font-bold mb-4">Upgrade to Premium</h2>
        <form ref="payment-form" :action=" route( 'upgrade.process' ) " method="POST" id="payment-form">
            @csrf
            <div class="mb-4">
                <label for="card-holder-name" class="block text-sm font-medium text-gray-700">Card Holder Name</label>
                <input type="text" id="card-holder-name"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
            </div>

            <div class="mb-4">
                <label for="card-element" class="block text-sm font-medium text-gray-700">Credit or debit card</label>
                <div id="card-element" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <!-- A Stripe Element will be inserted here. -->
                </div>
            </div>

            <button type="submit" id="card-button"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Process Payment
            </button>
        </form>
    </section>
</template>
