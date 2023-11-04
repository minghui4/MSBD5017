// pages/index.tsx
"use client"; 

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../../abi.json";
import { BigNumber, Bytes, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../config";
import dayjs from "dayjs"; 
import Link from 'next/link'
import Image from 'next/image'
import background from '../../public/img/background1.jpeg'
import styles from './page.module.css'
import { useRouter } from 'next/router'


const CampaginManagementPage = () => {

  const [EventName, setEventName] = useState<string>();
  const [Description, setDescription] = useState<string>();
  const [Deadline, setDeadline] = useState<number>()
  const [TargetFundsRaised, setTargetFundsRaised] = useState<number>();
  const [campaignId, setcampaignId] = useState<Bytes>();
  const [MangerName, setManagerName] = useState<string>();
  const [ManagerAddress, setManagerAddress] = useState<string>();
  const [createCampagin, setCreateCampagin] = useState<Boolean>(true);

  // const router = useRouter();
  // const ManagerAddress = '0x2741cA6cdf158e127E84EE6fABBAED0b3356293a'

  const signer = useMemo(() => {
    if (typeof window !== 'undefined' && ManagerAddress) {
      return new ethers.providers.Web3Provider(
        (window as any).ethereum
      ).getSigner();
    } else {
      return null;
    }
  }, [ManagerAddress]);
    
  const provider = useMemo(() => {
    // only connect to the contract if the user has MetaMask installed
    if (typeof window === "undefined") return null;
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }, []);

  const createCampaginSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Here!!!',signer);


    if (!signer) return;
    try {
      console.log('I am insider!!!',signer);

      event.preventDefault();
      // Perform form submission logic or API call here
      console.log('ManagerAddress:', ManagerAddress);
      console.log('Event Name:', EventName);
      console.log('Description Address:', Description);
      console.log('Deadline:', Deadline);
      console.log('TargetFundsRaised:', TargetFundsRaised);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(ngoName, ngoAddress);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.startCampaign(ManagerAddress,EventName,Description,Deadline,TargetFundsRaised)
      // wait for the transaction to be mined
      await tx.wait();

    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
    console.log('Here!!!');

  }, [ManagerAddress,EventName,Description,Deadline,TargetFundsRaised, signer]);

  const endCampaginSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!signer) return;
    try {

      event.preventDefault();
      // Perform form submission logic or API call here
      console.log('Event Name:', EventName);
      console.log('Description Address:', Description);

      // Pass the field values to your Smart Contract function here
      // smartContractMethod(ngoName, ngoAddress);
      const MainContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const tx = await MainContract.startCampaign(ManagerAddress,EventName,Description,Deadline,TargetFundsRaised)
      // wait for the transaction to be mined
      await tx.wait();
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [ManagerAddress,EventName,Description,Deadline,TargetFundsRaised, signer]);

return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-lg lg:max-w-xl">
        <div className="flex justify-between mb-8">
          <button 
              className="w-1/2 mr-2 py-2 tracking-wide text-white transition-colors transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              onClick={(event) => setCreateCampagin(true)}
              >
              Create New Campaign
          </button>
          <span> </span>
          <button 
              className="w-1/2 ml-2 py-2 tracking-wide text-white transition-colors transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
              onClick={(event) => setCreateCampagin(false)}
              >
              End Campaign
          </button>
        </div>
        {createCampagin==true ? (
          <div>
            <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">Create a New Campaign</h1>
            <form className="mt-6 space-y-4" onSubmit={createCampaginSubmit}>
              <div>
                <label
                    htmlFor="ManagerAddress"
                    className="block text-lg font-semibold text-gray-800"
                >
                Manager&apos; Address
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
                      htmlFor="eventName"
                      className="block text-lg font-semibold text-gray-800"
                  >
                  Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    onChange={(event) => setEventName(event.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                  />
              </div> 
              <div>
                <label
                    htmlFor="Description"
                    className="block text-lg font-semibold text-gray-800"
                >
                    Event Description
                </label>
                <input
                  type="text"
                  id="EventDescription"
                  onChange={(event) => setDescription(event.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                    htmlFor="Event Deadline"
                    className="block text-lg font-semibold text-gray-800"
                >
                    Event Deadline
                </label>
                <input
                  type="date"
                  id="EventDeadline"
                  onChange={(event) => setDeadline(Math.floor(new Date(event.target.value).getTime() / 1000))}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                    htmlFor="FundRaising Target"
                    className="block text-lg font-semibold text-gray-800"
                >
                    Target Fund Raising
                </label>
                <input
                  type="number"
                  id="FundRaisingTarget"
                  onChange={(event) => setTargetFundsRaised(event.target.valueAsNumber)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              </div>
              <div className="mt-2">
                <button 
                    className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-5xl font-semibold text-center text-gray-700 mb-8">End Campaign</h1>
            <form className="mt-6 space-y-4" onSubmit={endCampaginSubmit}>
              <div>
                <label
                    htmlFor="ContractAddress"
                    className="block text-lg font-semibold text-gray-800"
                >
                  Contract Address
                </label>
                <input
                  type="text"
                  id="ContractAddress"
                  onChange={(event) => setContractAddress(event.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                />
              </div> 
              <div className="mt-2">
                <button 
                    className="w-full px-4 py-2 text-lg tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaginManagementPage;
