// pages/index.tsx
"use client"; 

import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import { push, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";
import { useRouter } from 'next/navigation';

const BuyerRegistrationPage = () => {

  const [BuyerName, setBuyerName] = useState<string>();
  const [BuyerAddress, setBuyerAddress] = useState<string>();
  const router = useRouter();

  const signer = useMemo(() => {
    if (!BuyerAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [BuyerAddress]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
    
  }, []);

  const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {
      const buyersRef = ref(database, 'Buyers');
      const newDataRef = push(buyersRef);

      // Perform form submission logic or API call here
      console.log('Buyer Name:', BuyerName);
      console.log('BuyerAddress:', BuyerAddress);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(BuyerName, DonerAddres);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.registerBuyer(BuyerName,BuyerAddress)
      // wait for the transaction to be mined
      await tx.wait();
      set(newDataRef, { 
        BuyerName: BuyerName,
        BuyerAddress: BuyerAddress
      });
      alert("Buyer Registered Successfully");
      router.push('/landing');
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [BuyerName, BuyerAddress, signer, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Buyer Registration</h1>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
            <div>
            <label
                htmlFor="BuyerName"
                className="block text-lg font-semibold text-gray-800"
            >
            Buyer&apos;s Name
            </label>
            <input
              type="text"
              id="BuyerName"
              onChange={(event) => setBuyerName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="BuyerAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                Buyer&apos;s Address
            </label>
            <input
              type="text"
              id="BuyerAddress"
              onChange={(event) => setBuyerAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  type="submit" disabled={!BuyerAddress}>
                  Register
              </button>
            </div>  
        </form> 
      </div>
    </div> 
  );
};

export default BuyerRegistrationPage;