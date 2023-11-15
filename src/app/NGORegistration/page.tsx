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

const NGORegistrationPage = () => {

  const [NGOName, setNGOName] = useState<string>();
  const [NGOAddress, setNGOAddress] = useState<string>();
  const [ManagerName, setManagerName] = useState<string>();
  const [ManagerAddress, setManagerAddress] = useState<string>();
  const [FirstApproverName, setFirstApproverName] = useState<string>();
  const [FirstApproverAddress, setFirstApproverAddress] = useState<string>();
  const [SecondApproverName, setSecondApproverName] = useState<string>();
  const [SecondApproverAddress, setSecondApproverAddress] = useState<string>();

  const router = useRouter();
  const signer = useMemo(() => {
    if (!NGOAddress) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [NGOAddress]);
  
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
    
  }, []);

  const handleFormSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {
      const ngosRef = ref(database, 'NGOs');
      const newDataRef = push(ngosRef);

      event.preventDefault();
      // Perform form submission logic or API call here
      console.log('NGO Name:', NGOName);
      console.log('NGO Address:', NGOAddress);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(ngoName, ngoAddress);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.registerNgo(NGOName,NGOAddress)
      // wait for the transaction to be mined
      await tx.wait();
      const tx2 = await MainContract.registerManager(ManagerName,ManagerAddress)
      await tx2.wait();
      const tx3 = await MainContract.registerApprover(FirstApproverName,FirstApproverAddress)
      await tx3.wait();
      const tx4 = await MainContract.registerApprover(SecondApproverName,SecondApproverAddress)
      await tx4.wait();

      set(newDataRef, { 
        NGOName: NGOName,
        NGOAddress: NGOAddress,
        ManagerName: ManagerName,
        ManagerAddress: ManagerAddress,
        FirstApproverName: FirstApproverName,
        FirstApproverAddress: FirstApproverAddress,
        SecondApproverName: SecondApproverName,
        SecondApproverAddress: SecondApproverAddress,
      });
      alert("NGO Registered Successfully");
      router.push('/landing');
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [NGOName, NGOAddress, ManagerName,ManagerAddress,FirstApproverName,FirstApproverAddress, SecondApproverName, SecondApproverAddress, signer, router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">NGO Registration</h1>
        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
            <div>
            <label
                htmlFor="ngoName"
                className="block text-lg font-semibold text-gray-800"
            >
            NGO&apos;s Name
            </label>
            <input
              type="text"
              id="ngoName"
              onChange={(event) => setNGOName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="ngoAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                NGO&apos;s Address
            </label>
            <input
              type="text"
              id="ngoAddress"
              onChange={(event) => setNGOAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="ManagerName"
                className="block text-lg font-semibold text-gray-800"
            >
                Manager&apos;s Name
            </label>
            <input
              type="text"
              id="ManagerName"
              onChange={(event) => setManagerName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="ManagerAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                Manager&apos;s Address
            </label>
            <input
              type="text"
              id="ManagerAddress"
              onChange={(event) => setManagerAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="FirstApproverName"
                className="block text-lg font-semibold text-gray-800"
            >
                Approver&apos;s Name
            </label>
            <input
              type="text"
              id="FirstApproverName"
              onChange={(event) => setFirstApproverName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="FirstApproverAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                First Approver&apos;s Address
            </label>
            <input
              type="text"
              id="FirstApproverAddress"
              onChange={(event) => setFirstApproverAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="SecondApproverName"
                className="block text-lg font-semibold text-gray-800"
            >
                Approver&apos;s Name
            </label>
            <input
              type="text"
              id="SecondtApproverName"
              onChange={(event) => setSecondApproverName(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>
            <div>
            <label
                htmlFor="SecondApproverAddress"
                className="block text-lg font-semibold text-gray-800"
            >
                Second Approver&apos;s Address
            </label>
            <input
              type="text"
              id="SecondApproverAddress"
              onChange={(event) => setSecondApproverAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
            />
            </div>

            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                  type="submit" disabled={!FirstApproverAddress}>
                  Register
              </button>
            </div>  
        </form> 
      </div>
    </div> 
  );
};

export default NGORegistrationPage;