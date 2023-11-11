'use client';
import { useEffect, useState } from "react";
import { checkout } from "./api/checkout";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";

interface NGO {
    ManagerAddress: string;
    NGOName: string;
    // Add other properties of the NGO object as needed
  }  

interface Campaign {
  ManagerAddress: string;
  EventName: string;
  Description: string;
  Deadline: string;
  TargetFundsRaised: number;
}

interface CombinedData extends Campaign {
    NGOName?: string;
  }
  

  const DonationPage = () => {
    const [customAmount, setCustomAmount] = useState('');
    const [campaignsArray, setCampaignsArray] = useState<CombinedData[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<CombinedData | null>(null);
  
    useEffect(() => {
      const campaignsRef = ref(database, 'Campaigns');
      const ngosRef = ref(database, 'NGOs');
  
      get(campaignsRef).then((campaignsSnapshot) => {
        if (campaignsSnapshot.exists()) {
          let campaignsData = Object.values(campaignsSnapshot.val()) as Campaign[];
  
          get(ngosRef).then((ngosSnapshot) => {
            if (ngosSnapshot.exists()) {
              const ngosData = Object.values(ngosSnapshot.val()) as NGO[];
  
              campaignsData = campaignsData.map((campaign: Campaign) => {
                const ngoData = ngosData.find((ngo: NGO) => ngo.ManagerAddress === campaign.ManagerAddress);
  
                return {
                  ...campaign,
                  NGOName: ngoData ? ngoData.NGOName : undefined,
                };
              });
  
              setCampaignsArray(campaignsData);
            } else {
              console.log("No NGOs data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        } else {
          console.log("No campaigns data available");
        }
      }).catch((error) => {
        console.error(error);
      });
  
    }, []);

    const handleDonation = (amount: number) => {
        checkout({
            lineItems: [
                {
                    price: "price_1O0oPIAiHbmBADrrzlQa2gcF",
                    quantity: amount / 5 // Assuming price_1O0oPIAiHbmBADrrzlQa2gcF is $5
                }
            ]
        });
    }
  // function collectDonation(uint256 amount, string memory currency, string memory ngoName, bytes32 campaignId, string memory STXID) external payable {

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Donate to an NGO</h1>
        
        <label htmlFor="campaign" className="block text-sm mb-2">
            <span className="text-gray-700">Choose a Campaign:</span>
                <select 
                id="campaign" 
                className="form-select mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                onChange={(e) => setSelectedCampaign(campaignsArray.find(campaign => campaign.EventName === e.target.value) || null)}
                >
                <option value="" disabled selected>Please select Campaign</option>
                {campaignsArray.map((campaign, index) => (
                    <option key={index} value={campaign.EventName}>{campaign.EventName}</option>
                ))}
            </select>
        </label>

        {selectedCampaign && (
          <div className="mt-4">
            <p><strong>NGO Name:</strong> {selectedCampaign.NGOName}</p>
            <p><strong>Event Name:</strong> {selectedCampaign.EventName}</p>
            <p><strong>Description:</strong> {selectedCampaign.Description}</p>
            <p><strong>Deadline:</strong> {selectedCampaign.Deadline}</p>
            <p><strong>Target Funds Raised:</strong> {selectedCampaign.TargetFundsRaised}</p>
          </div>
        )}
  
        <p className="text-sm text-gray-500 text-center mb-4">Choose the amount you want to donate:</p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[5, 10, 50].map((amount) => (
            <button
              key={amount} 
              className="p-4 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => handleDonation(amount)}
            >
              Donate ${amount}
            </button>
          ))}
        </div>
  
        <div className="flex items-center justify-between">
          <label htmlFor="customAmount" className="text-sm text-gray-700">Other amount:</label>
          <div className="flex items-center">
            <input 
              type="number" 
              id="customAmount"
              min="1" 
              className="p-2 mr-2 border border-gray-300 rounded-md" 
              placeholder="Custom amount" 
              value={customAmount} 
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <button 
              className="p-2 px-4 text-sm font-semibold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none"
              onClick={() => {
                if (customAmount !== '') {
                  handleDonation(parseInt(customAmount, 10));
                }
              }}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;