"use client"; 

import { useState, useEffect } from 'react';
import { orderByChild, ref, get, query, equalTo, limitToLast } from 'firebase/database';
import { database } from "../firebaseConfig";

// import { useRouter } from 'next/router'; // If the useRouter from 'next/navigation' is used in the new version, please change it accordingly.

interface DonationData {
  Timestamp: string;
  Txn: string;
  Amount: number;
  allocatedAmount: number;
  allocatedTo: Receiver;
  CampaignAddress: string;
  Currency: string;
  DonerEmail: string;
  DonerName: string;
  Status: string;
}

interface Receiver {
  ReceiverName: string;
  ReceiverAddress: string;
}


const TraceDonationPage = () => {
  const [txnId, setTxnId] = useState('');
  const [donationData, setDonationData] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const donationsRef = ref(database, 'donations');
      const q = query(donationsRef, orderByChild('Timestamp'), limitToLast(1)); // Order by timestamp and limit to the last 1 record
      const snapshot = await get(q); 
  
      if (snapshot.exists()) {
        const donationDataArray = Object.values(snapshot.val()) as DonationData[];
        if (donationDataArray.length > 0) {
          setDonationData(donationDataArray[0]); // Set the latest donation
        } else {
          setError('No donations found');
        }
      } else {
        setError('No donations found');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDonationData(null);
    setError(null);

    if (!txnId) {
      setError('Please enter a transaction ID');
      return;
    }

    fetchData();
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Trace Donation</h1>
        <p className="mb-4 text-lg text-gray-800">Enter the transaction ID of the donation you want to trace.</p>
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              type="text"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="Enter Transaction ID"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
  
      {loading && <p className="mt-6 text-lg text-gray-700">Loading...</p>}
  
      {error && <p className="mt-6 text-red-500">{error}</p>}
  
      {donationData && (
        <div className="w-full mt-6 p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Donation Details</h2>
          <p className="text-lg text-gray-800"><span className="font-bold">Transaction ID:</span> {donationData.Txn}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Amount:</span> {donationData.Amount}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Allocated Amount:</span> {donationData.allocatedAmount}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Allocated To:</span> {donationData.allocatedTo && donationData.allocatedTo.ReceiverName}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Campaign Address:</span> {donationData.CampaignAddress}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Currency:</span> {donationData.Currency}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Donor Name:</span> {donationData.DonerName}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Donor Email:</span> {donationData.DonerEmail}</p>
          <p className="text-lg text-gray-800"><span className="font-bold">Status:</span> {donationData.Status}</p>
        </div>
      )}    
    </div>
  )
}

export default TraceDonationPage;