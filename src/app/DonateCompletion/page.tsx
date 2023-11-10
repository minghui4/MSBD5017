"use client"; 

import { useEffect, useState } from "react";
import Link from 'next/link'

interface ChargeData {
  id: string;
  amount: number;
  status: string;
  currency: string;
  DonerName: string;
  DonerEmail: string;
  DonerPhone: string;
}

const DonateCompletionPage = () => {
  const [charge, setCharge] = useState<ChargeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`/DonateCompletion/api/?chargeId=ch_3OArWHAiHbmBADrr0A4MJ7gc`);

        const response = await fetch(`/DonateCompletion/api/`, { 
          headers: {
            'Cache-Control': 'no-store'
          }
        });

        const data = await response.json();

        const chargeData: ChargeData = {
          id: data.message.data[0].id,
          amount: data.message.data[0].amount / 100,
          status: data.message.data[0].status,
          currency: data.message.data[0].currency,
          DonerName: data.message.data[0].billing_details.name,
          DonerEmail: data.message.data[0].billing_details.email,
          DonerPhone: data.message.data[0].billing_details.phone
        };

        setCharge(chargeData);
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!charge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-200">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Thank You for Your Donation!</h2>
        <p className="mt-2 text-sm text-center text-gray-600">Here are the details of your donation:</p>

        <div className="flex flex-col mt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-700">Transaction ID:</p>
            <p className="text-gray-700">{charge.id}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-700">Amount:</p>
            <p className="text-gray-700">${charge.amount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Status:</p>
            <p className="text-gray-700">{charge.status}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Currency:</p>
            <p className="text-gray-700">{charge.currency}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Donor Name:</p>
            <p className="text-gray-700">{charge.DonerName}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Donor Email:</p>
            <p className="text-gray-700">{charge.DonerEmail}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Donor Phone:</p>
            <p className="text-gray-700">{charge.DonerPhone}</p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/landing">
            <button className="block w-full px-4 py-2 font-bold text-center text-white bg-blue-600 hover:bg-blue-500 rounded-md">
              Back to Landing Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateCompletionPage;