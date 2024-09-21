<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UpgradeController extends Controller
{
    public function show()
    {
        return hybridly('upgrade/show');
    }

    public function process(Request $request)
    {
        $user = $request->user();
        $paymentMethodId = $request->input('payment_method_id');

        try {
            $user->createOrGetStripeCustomer();
            $user->addPaymentMethod($paymentMethodId);

            $user->newSubscription('premium', env('STRIPE_PREMIUM_PRICE_ID'))
                ->create($paymentMethodId);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
