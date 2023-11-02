// pages/index.tsx
"use client"; 

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import dayjs from "dayjs"; 
import Link from 'next/link'
import Image from 'next/image'
import background from '../../public/img/background1.jpeg'
import styles from './page.module.css'


const NGORegistrationPage = () => {

  const [NGOName, setNGOName] = useState<string>();
  const [NGOAddress, setNGOAddress] = useState<string>();
  const [MangerName, setManagerName] = useState<string>();
  const [ManagerAddress, setManagerAddress] = useState<string>();
  const [ApproverName, setApproverName] = useState<string>();
  const [ApproverAddress, setApproverAddress] = useState<string>();


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
      const tx2 = await MainContract.registerManager(MangerName,ManagerAddress)
      await tx2.wait();
      const tx3 = await MainContract.registerApprover(ApproverName,ApproverAddress)
      await tx3.wait();

    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [NGOName, NGOAddress, MangerName,ManagerAddress,ApproverName,ApproverAddress, signer]);

  return (
    
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <div>
      {/* {!address ? (
          <button onClick={connectToTheMetaMask} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" >
            <span>Connect</span>  
            </button>
      ):(<span> Address: {address}</span>)}
      </div>
      <br /> 
      <div>
      {!address ? (
        <div></div>
      ):(
        <Link
          href="/landing">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Let&apos;s Get Started!</button>
        </Link>
      )} */}
      </div>
        <h1 className="text-3xl font-bold text-center text-gray-700">NGO Registration</h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                  htmlFor="NGOs Name"
                  className="block text-sm font-semibold text-gray-800"
              >
              NGO&apos;s Name
              </label>
              <input
                type="text"
                id="ngoName"
                // value={}
                onChange={(event) => setNGOName(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              </div>
            <div className="mb-2">
              <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
              >
                  NGO&apos;s Address
              </label>
              <input
                type="text"
                id="ngoAddress"
                // value={NGOAddress}
                onChange={(event) => setNGOAddress(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="Approver's Name"
                  className="block text-sm font-semibold text-gray-800"
              >
              Manager&apos;s Name
              </label>
              <input
                type="text"
                id="ManagerName"
                // value={}
                onChange={(event) => setManagerName(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                  htmlFor="Manager Address"
                  className="block text-sm font-semibold text-gray-800"
              >
                  Manager&apos;s Address
              </label>
              <input
                type="text"
                id="ManagerAddress"
                // value={ManagerAddress}
                onChange={(event) => setManagerAddress(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="Approver's Name"
                  className="block text-sm font-semibold text-gray-800"
              >
              Approver&apos;s Name
              </label>
              <input
                type="text"
                id="ApproverName"
                // value={}
                onChange={(event) => setApproverName(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                  htmlFor="Approver Address"
                  className="block text-sm font-semibold text-gray-800"
              >
                  Approver&apos;s Address
              </label>
              <input
                type="text"
                id="approverAddress"
                // value={ApproverAddress}
                onChange={(event) => setApproverAddress(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  type="submit" disabled={!ApproverAddress}>
                  Registration
              </button>
            </div>  
        </form> 
      </div>
    </div> 
  );
};

export default NGORegistrationPage;
