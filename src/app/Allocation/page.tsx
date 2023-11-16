'use client';
import { useState, useEffect } from 'react';
import { orderByChild, ref, get, set, query, equalTo } from 'firebase/database';
import { database } from "../firebaseConfig";
import { useRouter } from 'next/navigation';


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
  Timestamp: string;
  FirstApproverName: string;
  FirstApproverAddress: string;
  SecondApproverName: string;
  SecondApproverAddress: string;
}

interface Receiver {
  ReceiverName: string;
  ReceiverAddress: string;
}

const formatTimestamp = (unixTimestamp: string | number | Date) => {
  // If your timestamp is in seconds, uncomment the next line
  const temp = typeof unixTimestamp === 'number' ? unixTimestamp * 1000 : unixTimestamp;
  const dateObj = new Date(temp);
  return dateObj.toISOString();
};

const DonationAllocationPage = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation>();
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver>();
  const [allocationAmount, setAllocationAmount] = useState('');
  const [firstApproverName, setFirstApproverName] = useState('');
  const [firstApproverAddress, setFirstApproverAddress] = useState('');
  const [secondApproverName, setSecondApproverName] = useState('');
  const [secondApproverAddress, setSecondApproverAddress] = useState('');
  const router = useRouter(); 

  const fetchData = async () => {
    try {
      const donationDataRef = ref(database, 'donations');
      const donationDataSnapshot = await get(donationDataRef);
      if (donationDataSnapshot.exists()) {
        const dataObject = donationDataSnapshot.val();
        let dataArray = Object.keys(dataObject).map(key => ({
          id: key,
          ...dataObject[key],
          Timestamp: formatTimestamp(dataObject[key].Timestamp),
        }));

        // Sort in descending order of 'Timestamp'
        dataArray.sort((a, b) => new Date(b['Timestamp']).getTime() - new Date(a['Timestamp']).getTime());

        // Reduce to unique 'Txn' collection
        const uniqueDataArray = dataArray.reduce((uniqueArray, item) => {
          const existingItem = uniqueArray.find((uniqueItem: { [x: string]: any; }) => uniqueItem['Txn'] === item['Txn']);
          // console.log('Replacing existing item with current item', item)
          // console.log('Existing item', existingItem)
          if (existingItem) {
              // If item with this 'Txn' already exists, only replace if current item is newer
              console.log('Timestamp of current item', new Date(item['Timestamp']).getTime())
              console.log('Timestamp of existing item', new Date(existingItem['Timestamp']).getTime())
              if (new Date(item['Timestamp']).getTime() > new Date(existingItem['Timestamp']).getTime()) {
                  // Replace the existing item with the current item
                  console.log('I am Here!!!!')
                  console.log('Replacing existing item with current item', item)
                  console.log('Existing item', existingItem)
                  const index = uniqueArray.indexOf(existingItem);
                  uniqueArray[index] = item;
              }
          } else {
              // If item with this 'Txn' does not exist, add to array
              uniqueArray.push(item);
          }
          return uniqueArray;
        }, []);  
        
        setDonations(uniqueDataArray);
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAllocate = async () => {
    if (selectedDonation && selectedReceiver && allocationAmount) {
      const donationAmount = Number(selectedDonation.Amount);
      const allocatedAmount = Number(selectedDonation.allocatedAmount) || 0;
      const newAllocationAmount = Number(allocationAmount);
  
      if (newAllocationAmount <= donationAmount - allocatedAmount) {
        const selectedDonationRef = ref(database, `donations/${selectedDonation.Txn}`);
        const newAllocatedAmount = allocatedAmount + newAllocationAmount;
  
        await set(selectedDonationRef, {
          ...(selectedDonation as object),
          allocatedTo: selectedReceiver,
          allocatedAmount: newAllocatedAmount,
          Status: 'allocated',
          Timestamp: new Date().toISOString(),
        })
          .then(() => {
            alert('Allocation successful');
            // fetchData(); // Fetch the data again after the allocation
            router.push('/Allocation');

          })
          .catch((error) => {
            alert(`Error: ${error}`);
          });
      } else {
        alert('Allocation amount exceeds the remaining donation amount');
      }
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
                <th>Donor Email</th>
                <th>Donor Name</th>
                <th>Status</th>
                <th>Allocated Amount</th>
                <th>Timestamp</th>
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
                  <td>{donation.Timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {selectedDonation && (
          <div className="mt-6">
            <table className="table-auto">
              <tbody>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Txn:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.Txn}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Amount:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.Amount}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Campaign Address:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.CampaignAddress}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Currency:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.Currency}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Doner Email:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.DonerEmail}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Doner Name:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.DonerName}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Status:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.Status}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Donated Amount:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.allocatedAmount}</td>
                </tr>
                <tr>
                  <td className="text-lg text-gray-700 font-semibold">Allocated To:</td>
                  <td className="text-lg text-gray-800">{selectedDonation.allocatedTo?.ReceiverName}</td>
                </tr>
              </tbody>
            </table>
          
            <div className="mt-6">
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

              {/* Input fields for first approver */}
              <label htmlFor="firstApproverName" className="block text-lg mb-2">
                <span className="text-gray-700">First Approver Name:</span>
                <input
                  type="text"
                  id="firstApproverName"
                  className="form-input mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                  value={firstApproverName}
                  onChange={(e) => setFirstApproverName(e.target.value)}
                />
              </label>

              <label htmlFor="firstApproverAddress" className="block text-lg mb-2">
                <span className="text-gray-700">First Approver Address:</span>
                <input
                  type="text"
                  id="firstApproverAddress"
                className="form-input mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                  value={firstApproverAddress}
                  onChange={(e) => setFirstApproverAddress(e.target.value)}
                />
              </label>

              {/* Input fields for second approver */}
              <label htmlFor="secondApproverName" className="block text-lg mb-2">
                <span className="text-gray-700">Second Approver Name:</span>
                <input
                  type="text"
                  id="secondApproverName"
                  className="form-input mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                  value={secondApproverName}
                  onChange={(e) => setSecondApproverName(e.target.value)}
                />
              </label>

              <label htmlFor="secondApproverAddress" className="block text-lg mb-2">
                <span className="text-gray-700">Second Approver Address:</span>
                <input
                  type="text"
                  id="secondApproverAddress"
                  className="form-input mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50"
                  value={secondApproverAddress}
                  onChange={(e) => setSecondApproverAddress(e.target.value)}
                />
              </label>

              <button className="p-2 px-4 text-lg font-semibold text-white bg-green-700 rounded hover:bg-green-600 focus:outline-none" onClick={handleAllocate}>Allocate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DonationAllocationPage;