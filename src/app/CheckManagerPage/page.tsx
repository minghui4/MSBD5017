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
import {useRouter} from 'next/navigation'

const CheckMangaerPage = () => {

  const [ManagerName, setManagerName] = useState<string>();
  const [ManagerAddress, setManagerAddress] = useState<string>();

  // async function connect() {
  //   const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  //   const firstAccount = accounts[0];
  //   // get balance
  //   const balance = await (window as any).ethereum.request({
  //     method: 'eth_getBalance',
  //     params: [firstAccount, 'latest'],
  //   });
  //   setAccount(firstAccount);
  //   setBalance(balance);
  // }

  // const connectToTheMetaMask = useCallback(async () => {
  //   // check if the browser has MetaMask installed
  //   if (!(window as any).ethereum) {
  //     alert("Please install MetaMask first.");
  //     return;
  //   }
  //   // get the user's account address
  //   const accounts = await (window as any).ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   setAddress(accounts[0]);
  // }, []);

  const router = useRouter()
  const [query, setQuery] = useState('')

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

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {ManagerAddress};
    router.push('/CampaginManagementPage')
    // if (ManagerAddress) {
    //   router.push(`/CampaignManagerPage?ManagerAddress=${ManagerAddress}`);
    // }
    
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
