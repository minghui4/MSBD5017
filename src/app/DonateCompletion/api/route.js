// src/app/DonateCompletion/api/route.js
import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation';


const { default: Stripe } = require('stripe');

const stripe = new Stripe('sk_test_51O0oMGAiHbmBADrr7k7NqefqK6P7qJPmASljpfvP86f4OOAP3p8uBcWuqcgZBEG4DsY9Klg6Z7LohTKc6pA3WEqe00Q3iqG0YQ');

export async function GET(request, { params }) {
  console.log(params);
  try {
    const charge = await stripe.charges.list({
      limit: 1,
    });
    console.log(charge);
    const response = NextResponse.json({ status: 200, message: charge });
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    return response;

    // return NextResponse.json({ status: 200, message: charge });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  } 
}
