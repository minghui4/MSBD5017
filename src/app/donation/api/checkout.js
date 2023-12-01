import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems, Campaign, DonorAddress, NGOName, NGODeadline }){
	let stripePromise = null

	const getStripe = () => {
		if(!stripePromise) {
			stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
			
		}
		return stripePromise
	}

	const stripe = await getStripe()

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems,
		// successUrl: `${window.location.origin}/DonateCompletion?session_id={CHECKOUT_SESSION_ID}`,
		// successUrl: `${window.location.origin}/DonateCompletion?session_id={CHECKOUT_SESSION_ID}&campaign_address=${Campaign.Campaign_ID}`,
		successUrl: `${window.location.origin}/DonateCompletion?session_id={CHECKOUT_SESSION_ID}&campaign_address=123&donor_address=${DonorAddress}&ngo_name=${NGOName}&ngo_deadline=${NGODeadline}`,
		cancelUrl: window.location.origin,
	})
}


// // This example uses Express to receive webhooks
// const express = require('express');
// const app = express();

// // Match the raw body to content type application/json
// // If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
// app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
//   const event = request.body;

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   response.json({received: true});
// });

// app.listen(8000, () => console.log('Running on port 8000'));
