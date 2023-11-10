// pages/index.tsx
"use client"; 

import { useCallback, useEffect, useMemo, useState} from "react";
import { push, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";

import Link from 'next/link'


interface ChargeData {
  id: string;
  amount: number;
  status: string;
}

const DonateCompletionPage = () => {
  const [charge, setCharge] = useState<ChargeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/DonateCompletion/api/?chargeId=ch_3OArWHAiHbmBADrr0A4MJ7gc`);
        const data = await response.json();
        const chargeData = {
          id: data.message.id,
          amount: data.message.amount,
          status: data.message.status
        };
        setCharge(chargeData);
        // const ngosRef = ref(database, 'NGOs');
        // const newDataRef = push(ngosRef);
        // set(newDataRef, { 
        //   amount: data.message.amount,
        //   status: data.message.status
        // });  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <h1>Thanks for your Donation</h1>
      <Link href="/landing">
        <button className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none">
          Back to Landing Page
        </button>
      </Link>
      <div>
        {charge && (
          <div>
            Display the charge details
            <p>Amount: {charge.amount / 100}</p>
            <p>Status: {charge.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonateCompletionPage;
