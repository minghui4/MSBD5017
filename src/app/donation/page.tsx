'use client';
import Head from "next/head"
import Image from "next/image"
import { useState } from "react";

import { checkout } from "./api/checkout"

const DonationPage = () => {
    const [customAmount, setCustomAmount] = useState('');

    const handleDonation = (amount: number) => {
        checkout({
            lineItems: [
                {
                    price: "price_1O0oPIAiHbmBADrrzlQa2gcF",
                    quantity: amount / 5 // Assuming price_1O0oPIAiHbmBADrrzlQa2gcF is $5
                }
            ]
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-3 bg-gray-200">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Donate</h1>
                <p className="text-gray-600 text-center">Choose the amount you want to donate:</p>
                <div className="flex flex-wrap justify-center mt-4 space-x-2">
                    {[5, 10, 50].map((amount) => (
                        <button
                            key={amount} 
                            className="px-4 py-2 m-2 font-semibold text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            onClick={() => handleDonation(amount)}
                        >
                            Donate ${amount}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-center mt-4">
                    <input 
                        type="number" 
                        min="1" 
                        className="w-1/2 p-2 mr-2 border rounded-md" 
                        placeholder="Custom amount" 
                        value={customAmount} 
                        onChange={(e) => setCustomAmount(e.target.value)}
                    />
                    <button 
                        className="px-4 py-2 font-semibold text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        onClick={() => {
                            handleDonation(parseInt(customAmount));
                            setCustomAmount('');
                        }}
                    >
                        Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;