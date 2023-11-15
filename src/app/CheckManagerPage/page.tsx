// pages/index.tsx
"use client"; 

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import {useRouter} from 'next/navigation'
import { database } from "../firebaseConfig";
import { push, ref, set, get, query, orderByChild, equalTo } from "firebase/database";

const CheckMangaerPage = () => {

  const [ManagerName, setManagerName] = useState<string>();
  const [ManagerAddress, setManagerAddress] = useState<string>();

  const router = useRouter();

  const signer = useMemo(() => {
    if (!ManagerAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [ManagerAddress]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
    
  }, []);

  const checkManagerExists = async (managerName: string | null, managerAddress: any) => {
    const managerQuery = query(ref(database, 'NGOs'), 
      orderByChild('ManagerName'), 
      equalTo(managerName)
    );
    const snapshot = await get(managerQuery);
    console.log(snapshot.val());

    if (snapshot.exists()) {
      const managerData = snapshot.val();
      // Check if the managerAddress matches
      console.log(managerData);
      for (let id in managerData) {
        console.log(managerData[id].managerAddress);
        console.log(managerAddress);
        if (managerData[id].ManagerAddress === managerAddress) {
          return true;
        }
      }
    }
    return false;
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {
      console.log('Manager Name:', ManagerName);
      console.log('Manager Address:', ManagerAddress);  
      const managerExists = await checkManagerExists(ManagerName || null, ManagerAddress || null);
      if (managerExists) {
        router.push('/CampaginManagementPage');
      } else {
        throw new Error("Manager does not exist");
      }
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Are you a Manager?</h1>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="Manager's Name"
              className="block text-lg font-semibold text-gray-800"
            >
              Your Name
            </label>
            <input
              type="text"
              id="managerName"
              onChange={(event) => setManagerName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="Manager's Address"
              className="block text-lg font-semibold text-gray-800"
            >
              Your Address
            </label>
            <input
              type="text"
              id="managerAddress"
              onChange={(event) => setManagerAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            /> 
          </div>
          <div className="mt-2">
            <button 
              className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              type="submit">
              Proceed
            </button>
          </div>  
        </form> 
      </div>
    </div> 
  );
};

export default CheckMangaerPage;
