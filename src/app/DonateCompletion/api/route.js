// src/app/DonateCompletion/api/route.js
import { NextRequest, NextResponse } from "next/server";

const { default: Stripe } = require('stripe');

const stripe = new Stripe('sk_test_51O0oMGAiHbmBADrr7k7NqefqK6P7qJPmASljpfvP86f4OOAP3p8uBcWuqcgZBEG4DsY9Klg6Z7LohTKc6pA3WEqe00Q3iqG0YQ');

export async function GET(request, { params }) {
  console.log(params);
  try {
    // const url = new URL(request.url);
    // const searchParams = new URLSearchParams(url.search);
    // const chargeId = searchParams.get("chargeId"); 
    // const charge = await stripe.charges.retrieve(chargeId);
    const charge = await stripe.charges.list({
      limit: 1,
    });
    console.log(charge);
    return NextResponse.json({ status: 200, message: charge });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
  
}

// export async function GET(request){
//   return new Response("Hello world!");
// }