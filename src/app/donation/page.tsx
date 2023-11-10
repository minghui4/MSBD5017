'use client';
import Head from "next/head"
import Image from "next/image"

import { checkout } from "./api/checkout"

const DonationPage = () => {
    return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <main >
                <h1 className="text-3xl font-bold text-center text-gray-700">Testing of Stripe Link</h1>
                <div>
                    <p className="text-center">Please Donate $5</p>
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    onClick={(() => {
                    checkout({
                        lineItems: [
                        {
                            price: "price_1O0oPIAiHbmBADrrzlQa2gcF",
                            quantity: 1
                        }
                        ]
                    })
                    })}>Donate NOW</button>
                </div>
            </main>
        </div>
    </div>
  );
};

export default DonationPage;