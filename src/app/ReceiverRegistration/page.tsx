// pages/index.tsx
"use client"; 

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import { push, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";
import { useRouter } from 'next/navigation';

const ReceiverRegistrationPage = () => {

  const [ReceiverName, setReceiverName] = useState<string>();
  const [ReceiverAddress, setReceiverAddress] = useState<string>();
  const router = useRouter();

  const signer = useMemo(() => {
    if (!ReceiverAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [ReceiverAddress]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
    
  }, []);

  const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {
      const receiversRef = ref(database, 'Receivers');
      const newDataRef = push(receiversRef);
    
      // Perform form submission logic or API call here
      console.log('Receiver Name:', ReceiverName);
      console.log('Receiver Address:', ReceiverAddress);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(ngoName, ngoAddress);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.registerReceiver(ReceiverName,ReceiverAddress)
      // wait for the transaction to be mined
      await tx.wait();
      set(newDataRef, { 
        ReceiverName: ReceiverName,
        ReceiverAddress: ReceiverAddress
      });
      alert("Receiver Registered Successfully");
      router.push('/landing');
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [ReceiverName, ReceiverAddress, signer, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Receiver Registration</h1>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
            <div>
            <label
                htmlFor="Receiver's Name"
                className="block text-lg font-semibold text-gray-800"
            >
            Receiver&apos;s Name
            </label>
            <input
              type="text"
              id="receiverName"
              onChange={(event) => setReceiverName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="Receiver Address"
                className="block text-lg font-semibold text-gray-800"
            >
                Receiver&apos;s Address
            </label>
            <input
              type="text"
              id="receiverAddress"
              onChange={(event) => setReceiverAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  type="submit" disabled={!ReceiverAddress}>
                  Register
              </button>
            </div>  
        </form> 
      </div>
    </div> 
  );
};

export default ReceiverRegistrationPage;