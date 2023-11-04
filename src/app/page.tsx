// pages/index.tsx
"use client"; 

import Head from "next/head";
import { useCallback, useEffect, useMemo, useState} from "react";
import abi from "../abi.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../config";
import dayjs from "dayjs"; 
import Link from 'next/link'
import Image from 'next/image'
import background from '../../public/img/background1.jpeg'

export default function Home() {
  
  const [address, setAddress] = useState();
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [NGOName, setNGOName] = useState<string>();
  const [NGOAddress, setNGOAddress] = useState<string>();

  async function connect() {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const firstAccount = accounts[0];
    // get balance
    const balance = await (window as any).ethereum.request({
      method: 'eth_getBalance',
      params: [firstAccount, 'latest'],
    });
    setAccount(firstAccount);
    setBalance(balance);
  }

  const connectToTheMetaMask = useCallback(async () => {
    // check if the browser has MetaMask installed
    if (!(window as any).ethereum) {
      alert("Please install MetaMask first.");
      return;
    }
    // get the user's account address
    const accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts",
    });
    setAddress(accounts[0]);
  }, []);

  const signer = useMemo(() => {
    if (!address) return null;
    return new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
  }, [address]);
  
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
    } catch (e) {
      // show any error using the alert box
      alert(`Error: ${e}`);
    }
  }, [NGOName, NGOAddress, signer]);


  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{padding: '20px'}}>
      <Image
        alt="background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1',
        }}
      />
  
      <div className="w-11/12 md:w-1/2 lg:w-1/3 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Connect to Your Digital Wallet</h1>
  
        <div className="mb-4">
          {!address ? (
            <button 
              onClick={connectToTheMetaMask} 
              className="w-full px-4 py-2 font-medium tracking-wide text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            >
              Connect
            </button>
          ) : (
            <p className="text-center text-gray-700">Address: {address}</p>
          )}
        </div>
  
        {address && (
          <Link href="/landing">
            <button 
              className="w-full px-4 py-2 font-medium tracking-wide text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200"
            >
              Let&apos;s Get Started!
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}