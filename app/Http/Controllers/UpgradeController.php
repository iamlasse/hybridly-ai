<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UpgradeController extends Controller
{
    public function show()
    {
        return hybridly('Upgrade.Show');
    }

    public function checkout(Request $request)
    {
        return hybridly('upgrade.checkout');
    }

    public function process(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:free,premium,enterprise',
            'payment_method_id' => 'required_if:plan,premium|string',
        ]);

        $user = $request->user();
        $plan = $request->input('plan');

        switch ($plan) {
            case 'free':
                $user->updatePlan('free');
                return to_route('dashboard')->with('success', 'You are now on the Free plan!');

            case 'premium':
                $paymentMethodId = $request->input('payment_method_id');
                try {
                    $stripeCustomer = $user->createOrGetStripeCustomer();
                    $user->updateDefaultPaymentMethod($paymentMethodId);
                    $user->newSubscription('premium', config('services.stripe.premium_price_id'))
                        ->create($paymentMethodId);

                    $user->updatePlan('premium');
                    return to_route('dashboard')->with('success', 'Upgrade to Premium successful!');
                } catch (\Laravel\Cashier\Exceptions\IncompletePayment $exception) {
                    return $exception->payment->confirm();
                } catch (\Exception $e) {
                    return back()->with('error', $e->getMessage());
                }

            case 'enterprise':
                return to_route('contact')->with('message', 'Thank you for your interest in our Enterprise plan. Our sales team will contact you shortly.');

            default:
                return back()->with('error', 'Invalid plan selected.');
        }
    }
}
