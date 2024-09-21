@extends('layouts.app')

@section('content')
				<div class="container">
								<h2 class="mb-4 text-2xl font-bold">Upgrade to Premium</h2>
								<form id="payment-form" action="{{ route('upgrade.process') }}" method="POST">
												@csrf
												<div class="mb-4">
																<label class="block text-sm font-medium text-gray-700" for="card-holder-name">Card Holder Name</label>
																<input class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm" id="card-holder-name"
																				type="text">
												</div>

												<div class="mb-4">
																<label class="block text-sm font-medium text-gray-700" for="card-element">Credit or debit card</label>
																<div class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" id="card-element">
																				<!-- A Stripe Element will be inserted here. -->
																</div>
												</div>

												<button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" id="card-button"
																type="submit">
																Process Payment
												</button>
								</form>
				</div>

				@push('scripts')
								<script src="https://js.stripe.com/v3/"></script>
								<script></script>
				@endpush
@endsection
