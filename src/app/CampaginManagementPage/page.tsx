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
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden parent">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <button 
            className=" px-4 py-2 tracking-wide text-white transition-colors transform bg-gray-700 rounded-md hover:bg-cyan-800 focus:outline-none focus:bg-cyan-800"
            onClick={(event) => setCreateCampagin(true)}
            >
            Create New Campaign
        </button>
        <span> </span>
        <button 
            className=" px-4 py-2 tracking-wide text-white transition-colors transform bg-gray-700 rounded-md hover:bg-cyan-800 focus:outline-none focus:bg-cyan-800"
            onClick={(event) => setCreateCampagin(false)}
            >
            
            End Campaign
        </button>
        {createCampagin==true ? (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-700">Create a New Campagin</h1>
            <form className="mt-6" onSubmit={createCampaginSubmit}>
              <div className="mb-4">
                <label
                    htmlFor="ManagerAddress"
                    className="block text-sm font-semibold text-gray-800"
                >
                Manager&apos; Address
                </label>
                <input
                  type="text"
                  id="ManagerAddress"
                  // value={}
                  onChange={(event) => setManagerAddress(event.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div> 
              <div className="mb-4">
                  <label
                      htmlFor="eventName"
                      className="block text-sm font-semibold text-gray-800"
                  >
                  Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    // value={}
                    onChange={(event) => setEventName(event.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div> 
              <div className="mb-2">
                <label
                    htmlFor="Description"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Event Description
                </label>
                <input
                  type="text"
                  id="EventDescription"
                  // value={ApproverAddress}
                  onChange={(event) => setDescription(event.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                    htmlFor="Event Deadline"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Event Deadline
                </label>
                <input
                  // type="number"
                  type="date"
                  id="EventDeadline"
                  // value={ApproverAddress}
                  onChange={(event) => setDeadline(Math.floor(new Date(event.target.value).getTime() / 1000))}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                    htmlFor="FundRaising Target"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Target Fund Raising
                </label>
                <input
                  type="number"
                  id="FundRaisingTarget"
                  // value={FundRaisingTarget}
                  onChange={(event) => setTargetFundsRaised(event.target.valueAsNumber)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <button 
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  type="submit"
                  onChange={(event) => setCreateCampagin(true)}
                  >
                  Create New Campaign
              </button>
            </form>
          </div>
        ):(
          <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">End a Campagin</h1>
            <form className="mt-6" onSubmit={endCampaginSubmit}>
              <div className="mb-4">
                  <label
                      htmlFor="Manager's Name"
                      className="block text-sm font-semibold text-gray-800"
                  >
                  Campaign ID
                  </label>
                  <input
                    type="text"
                    id="ManagerName"
                    // value={}
                    onChange={(event) => setcampaignId(ethers.utils.toUtf8Bytes(event.target.value))}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
              </div> 
              <button 
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  type="submit">
                  End Campaign 
              </button>
            </form>
          </div>
        )} 
      </div>
    </div>
  );
};

export default CampaginManagementPage;