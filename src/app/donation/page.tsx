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
  Deadline: number;
  TargetFundsRaised: number;
}

interface CombinedData extends Campaign {
    NGOName?: string;
    DeadlineDate: string;
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
              const deadlineDate = new Date(campaign.Deadline * 1000).toLocaleDateString();
    
              return {
                ...campaign,
                NGOName: ngoData ? ngoData.NGOName : undefined,
                DeadlineDate: deadlineDate
              } as CombinedData;
            });
      
            setCampaignsArray(campaignsData as CombinedData[]);
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
    if (selectedCampaign) {
      checkout({
        lineItems: [
          {
            price: "price_1OCZCQAiHbmBADrrscWCBmdH",
            quantity: amount / 1 // Assuming price_1OCZCQAiHbmBADrrscWCBmdH is $1
          }
        ],
        Campaign: 123 // pass the selectedCampaign details
      });
    } else {
      // handle case when no campaign is selected
      console.log('Please select a campaign before donating');
    }
  }
  // function collectDonation(uint256 amount, string memory currency, string memory ngoName, bytes32 campaignId, string memory STXID) external payable {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full p-10 bg-white rounded-md shadow-xl lg:max-w-2xl">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6 text-center">Donate to an NGO</h1>
        
        <label htmlFor="campaign" className="block text-lg mb-2">
            <span className="text-gray-700">Choose a Campaign:</span>
                <select 
                id="campaign" 
                className="form-select mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50" 
                onChange={(e) => setSelectedCampaign(campaignsArray.find(campaign => campaign.EventName === e.target.value) || null)}
                >
                <option value="" disabled selected>Please select Campaign</option>
                {campaignsArray.map((campaign, index) => (
                    <option key={index} value={campaign.EventName}>{campaign.EventName}</option>
                ))}
            </select>
        </label>

        {selectedCampaign && (
          <div className="mt-6">
            <p className="text-lg text-gray-800"><strong>NGO Name:</strong> {selectedCampaign.NGOName}</p>
            <p className="text-lg text-gray-800"><strong>Event Name:</strong> {selectedCampaign.EventName}</p>
            <p className="text-lg text-gray-800"><strong>Description:</strong> {selectedCampaign.Description}</p>
            <p className="text-lg text-gray-800"><strong>Deadline:</strong> {selectedCampaign.DeadlineDate}</p>
            <p className="text-lg text-gray-800"><strong>Target Funds Raised:</strong> {selectedCampaign.TargetFundsRaised}</p>
          </div>
        )}
  
        <p className="text-lg text-gray-500 text-center mb-4">Choose the amount you want to donate:</p>
        
        <div className="grid grid-cols-3 gap-6 mb-4">
          {[5, 10, 50].map((amount) => (
            <button
              key={amount} 
              className="p-4 text-lg font-semibold text-white bg-blue-700 rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => handleDonation(amount)}
            >
              Donate ${amount}
            </button>
          ))}
        </div>
  
        <div className="flex items-center justify-between">
          <label htmlFor="customAmount" className="text-lg text-gray-700">Other amount:</label>
          <div className="flex items-center">
            <input 
              type="number" 
              id="customAmount"
              min="1" 
              className="p-2 mr-2 text-gray-700 bg-gray-200 border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none focus:ring focus:ring-opacity-50" 
              placeholder="Custom amount" 
              value={customAmount} 
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <button 
              className="p-2 px-4 text-lg font-semibold text-white bg-green-700 rounded hover:bg-green-600 focus:outline-none"
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