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
    
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <div>
      </div>
        <h1 className="text-3xl font-bold text-center text-gray-700">Are you a Manager?</h1>
        <form className="mt-6" onSubmit={handleFormSubmit}>
            <div className="mb-4">
            <label
                htmlFor="Manager's Name"
                className="block text-sm font-semibold text-gray-800"
            >
            Your Name
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
                htmlFor="Manager's Address"
                className="block text-sm font-semibold text-gray-800"
            >
                Your&apos; Address
            </label>
            <input
              type="text"
              id="ManagerAddress"
              // value={ManagerAddress}
              onChange={(event) => setManagerAddress(event.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            </div>
            <div className="mt-2">
              <button 
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
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
