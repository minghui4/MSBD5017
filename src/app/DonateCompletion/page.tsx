"use client"; 

import { useEffect, useState,useRef, useMemo} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import Link from 'next/link'
import { set, ref, push } from "firebase/database";
import { database } from "../firebaseConfig";
import { useSearchParams } from 'next/navigation'; 


interface ChargeData {
  id: string;
  amount: number;
  status: string;
  currency: string;
  DonerName: string;
  DonerEmail: string;
  Created: string;
}

const DonateCompletionPage = () => {
  console.log('DonateCompletionPage rendered');
  const [charge, setCharge] = useState<ChargeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const donationsRef = ref(database, 'donations');
  const newDataRef = push(donationsRef);
  const searchParams = useSearchParams()
  const campaignAddress = searchParams.get('campaign_address')
  const donorAddress = searchParams.get('donor_address')
  const ngoName = searchParams.get('ngo_name');
  const campaignId = searchParams.get('campaign_address');
  const ngoDeadline = searchParams.get('ngo_deadline');
  const isWrittenRef = useRef(false);
  // console.log('useEffect ran, campaignAddress is', campaignAddress);

  const signer = useMemo(() => {
    if (!donorAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [donorAddress]);

  useEffect(() => {
    if (!signer) return;
    const fetchData = async () => {
      try {
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
          Created: data.message.data[0].created,
        };
        setCharge(chargeData);

        console.log('useEffect ran, campaignAddress is', campaignAddress);
  
        const newDataRef = push(donationsRef); // Moved inside useEffect and fetchData
        const campaignIdInBytes32 = campaignId ? ethers.utils.formatBytes32String(campaignId) : '';

        if (!isWrittenRef.current) {
          const newDataRef = push(donationsRef);
          // const timestamp = new Date(data.message.data[0].created * 1000).toLocaleDateString();
          set(newDataRef, { 
            Txn: data.message.data[0].id,
            Amount: data.message.data[0].amount / 100,
            Status: data.message.data[0].status,
            Currency: data.message.data[0].currency,
            DonerName: data.message.data[0].billing_details.name,
            DonerEmail: data.message.data[0].billing_details.email,
            NgoName: ngoName,
            CampaignAddress: campaignAddress,
            DonorAddress: donorAddress,
            CampaignId: campaignIdInBytes32,
            NGODeadline: ngoDeadline,
            Timestamp: data.message.data[0].created,
          });

          isWrittenRef.current = true;
        }
        const amount = Math.floor(data.message.data[0].amount / 100); // or Math.round()
        const currency = String(data.message.data[0].currency);
        const STXID = data.message.data[0].id ? String(data.message.data[0].id) : ""; // default to an empty string if it's null or undefined
        
        const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        console.log("Amount: ", amount);
        console.log("Currency: ", currency);
        console.log("NGO Name: ", ngoName);
        console.log("Campaign ID in Bytes32: ", campaignIdInBytes32);
        console.log("STXID: ", STXID);

        if (STXID) { // only call the function if STXID is not an empty string
          const tx = await MainContract.collectDonation(amount, 'HKD', ngoName, campaignIdInBytes32, STXID)
          // wait for the transaction to be mined
          await tx.wait();
        }        
      } catch (error: any) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, [campaignAddress]);
  
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
            <p className="text-gray-700">Campaign Address:</p>
            <p className="text-gray-700">{campaignAddress}</p>
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
            <p className="text-gray-700">Timestamp:</p>
            <p className="text-gray-700">{new Date(Number(charge.Created) * 1000).toLocaleString()}</p>
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