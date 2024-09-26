<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BillingController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        $invoices = $user->invoices();

        return hybridly('billing.show', [
            'invoices' => $invoices,
        ]);
    }

    public function cancelSubscription(Request $request)
    {
        $user = $request->user();

        if ($user->is_premium && $user->subscribed('premium')) {
            // Cancel the subscription
            $user->subscription('premium')->cancel();

            // Update user's premium status (this might be handled by a listener in a real-world scenario)
            $user->update(['is_premium' => false]);

            return back()->with('success', 'Your subscription has been cancelled. You will have access to premium features until the end of your current billing cycle.');
        }

        return back()->with('error', 'You do not have an active subscription to cancel.');
    }
}
