// pages/index.tsx
"use client"; 

import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import { push, ref, set } from "firebase/database";
import { database } from "../firebaseConfig";
import { useRouter } from 'next/navigation';

const DonerRegistrationPage = () => {

  const [DonerName, setDonerName] = useState<string>();
  const [DonerAddress, setDonerAddress] = useState<string>();
  const router = useRouter();

  const signer = useMemo(() => {
    if (!DonerAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [DonerAddress]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
    
  }, []);

  const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {
      const donersRef = ref(database, 'Doners');
      const newDataRef = push(donersRef);

      // Perform form submission logic or API call here
      console.log('Doner Name:', DonerName);
      console.log('Doner Address:', DonerAddress);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(DonerName, DonerAddress);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.registerDonor(DonerName,DonerAddress)
      // wait for the transaction to be mined
      await tx.wait();
      set(newDataRef, { 
        DonerName: DonerName,
        DonerAddress: DonerAddress
      });
      alert("Doner Registered Successfully");
      router.push('/landing');
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [DonerName, DonerAddress, signer, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Donor Registration</h1>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
            <div>
            <label
                htmlFor="DonerName"
                className="block text-lg font-semibold text-gray-800"
            >
            Donor&apos;s Name
            </label>
            <input
              type="text"
              id="DonerName"
              onChange={(event) => setDonerName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="DonerAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                Donor&apos;s Address
            </label>
            <input
              type="text"
              id="DonerAddress"
              onChange={(event) => setDonerAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  type="submit" disabled={!DonerAddress}>
                  Register
              </button>
            </div>  
        </form> 
      </div>
    </div> 
  );
};

export default DonerRegistrationPage;