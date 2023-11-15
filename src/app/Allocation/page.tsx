'use client';
import { useState, useEffect } from 'react';
import { orderByChild, ref, get, set, query, equalTo } from 'firebase/database';
import { database } from "../firebaseConfig";

interface Donation {
  Txn: string;
  Amount: number;
  CampaignAddress: string;
  Currency: string;
  DonerEmail: string;
  DonerName: string;
  Status: string;
  allocatedAmount: number;
  allocatedTo: Receiver;
}

interface Receiver {
  ReceiverName: string;
  ReceiverAddress: string;
}

const DonationAllocationPage = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation>();
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver>();
  const [allocationAmount, setAllocationAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationDataRef = ref(database, 'donations');
        const donationDataSnapshot = await get(donationDataRef);
        if (donationDataSnapshot.exists()) {
          const dataObject = donationDataSnapshot.val();
          const dataArray = Object.keys(dataObject).map(key => ({
            id: key,
            ...dataObject[key],
          }));
          setDonations(dataArray);
        } else {
          alert('No donations found');
        }
        
        const receiversDataRef = ref(database, 'Receivers');
        const receiversDataSnapshot = await get(receiversDataRef);
        if (receiversDataSnapshot.exists()) {
          const dataObject = receiversDataSnapshot.val();
          const dataArray = Object.keys(dataObject).map(key => ({
            id: key,
            ...dataObject[key],
          }));
          setReceivers(dataArray);
        } else {
          alert('No receivers found');
        }
        
      } catch (error) {
          alert(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleAllocate = () => {
    if (selectedDonation && selectedReceiver && allocationAmount) {
      const selectedDonationRef = ref(database, `donations/${selectedDonation.Txn}`);
      set(selectedDonationRef, {
        ...(selectedDonation as object),
        allocatedTo: selectedReceiver,
        allocatedAmount: allocationAmount,
        status: 'allocated'  // Add this line
      })
      .then(() => {
        alert('Allocation successful');
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
    } else {
      alert('Please select a donation, receiver, and enter an allocation amount');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-10 bg-white rounded-md shadow-xl lg:max-w-6xl">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6 text-center">Allocate Donations</h1>
          <div className="overflow-x-auto">
          <table className="w-full mb-5 text-center border-collapse border-2 border-gray-500">
            <thead>
              <tr>
                <th>Action</th>
                <th>Txn</th>
                <th>Amount</th>
                <th>Campaign Address</th>
                <th>Currency</th>
                <th>Doner Email</th>
                <th>Doner Name</th>
                <th>Status</th>
                <th>Allocated Amount</th>
                <th>Allocated To</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.Txn}>
                  <td>
                    <button className="p-2 px-4 text-sm font-semibold text-white bg-blue-700 rounded hover:bg-blue-600 focus:outline-none" onClick={() => setSelectedDonation(donation)}>
                      Select
                    </button>
                  </td>
                  <td>{donation.Txn}</td>
                  <td>{donation.Amount}</td>
                  <td>{donation.CampaignAddress}</td>
                  <td>{donation.Currency}</td>
                  <td>{donation.DonerEmail}</td>
                  <td>{donation.DonerName}</td>
                  <td>{donation.Status}</td>
                  <td>{donation.allocatedAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {selectedDonation && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Selected Donation</h2>
            <p className="text-lg text-gray-800"><strong>Txn:</strong> {selectedDonation.Txn}</p>
            <p className="text-lg text-gray-800"><strong>Amount:</strong> {selectedDonation.Amount}</p>
            <p className="text-lg text-gray-800"><strong>Campaign Address:</strong> {selectedDonation.CampaignAddress}</p>
            <p className="text-lg text-gray-800"><strong>Currency:</strong> {selectedDonation.Currency}</p>
            <p className="text-lg text-gray-800"><strong>Doner Email:</strong> {selectedDonation.DonerEmail}</p>
            <p className="text-lg text-gray-800"><strong>Doner Name:</strong> {selectedDonation.DonerName}</p>
            <p className="text-lg text-gray-800"><strong>Status:</strong> {selectedDonation.Status}</p>
            <p className="text-lg text-gray-800"><strong>Donated Amount:</strong> {selectedDonation.allocatedAmount}</p>
            <p className="text-lg text-gray-800"><strong>Allocated To:</strong> {selectedDonation.allocatedTo?.ReceiverName}</p>
  
            <label htmlFor="receiver" className="block text-lg mb-2">
              <span className="text-gray-700">Choose a Receiver:</span>
              <select 
                id="receiver" 
                className="form-select mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50" 
                onChange={(e) => setSelectedReceiver(receivers.find(receiver => receiver.ReceiverAddress === e.target.value))}
              >
                <option value="">Please select</option>
                {receivers.map(receiver => (
                  <option key={receiver.ReceiverAddress} value={receiver.ReceiverAddress}>
                    {receiver.ReceiverName}
                  </option>
                ))}
              </select>
            </label>
  
            <label htmlFor="amount" className="block text-lg mb-2">
              <span className="text-gray-700">Allocation Amount:</span>
              <input 
                type="number" 
                id="amount" 
                min="1" 
                className="form-input mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50" 
                value={allocationAmount} 
                onChange={(e) => setAllocationAmount(e.target.value)} 
              />
            </label>
  
            <button className="p-2 px-4 text-lg font-semibold text-white bg-green-700 rounded hover:bg-green-600 focus:outline-none" onClick={handleAllocate}>Allocate</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DonationAllocationPage;