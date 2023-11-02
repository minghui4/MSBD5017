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
    <div style={{ padding: 20 }}>
      <Image
        alt="background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
      />
      
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700"> Connect to Your Digital Wallet</h1> <br />
        <div>
        {!address ? (
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
        )}
        </div>
          {/* <h1 className="text-3xl font-bold text-center text-gray-700">Registration</h1>
          <form className="mt-6" onSubmit={handleFormSubmit}>
              <div className="mb-4">
              <label
                  htmlFor="NGOs Name"
                  className="block text-sm font-semibold text-gray-800"
              >
              NGOs Name
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
                  NGOs Address
              </label>
              <input
                type="text"
                id="ngoAddress"
                // value={NGOAddress}
                onChange={(event) => setNGOAddress(event.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              </div>
          </form>  */}
        </div>
      </div> 
    </div>
  );

}