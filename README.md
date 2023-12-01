This is a MSBD5017 project with Next.js bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser connected to Metamask to see the result.

Or you can directly check (https://msbd-5017.vercel.app/) which connected to this github repository. 

## Function with demonstration:

**- Landing Page (Containing list of Functions for demo) - https://msbd-5017.vercel.app/landing**

**- Registration of NGO - https://msbd-5017.vercel.app/NGORegistration**
  - This page is for registation of NGO. Below is the testing data for your reference.
  - You may use ETH address generator (e,g.: https://vanity-eth.tk/) to generate new address for testing.
  
    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | NGO's Name                	| NGO1                                       	|
    | NGO's Address             	| 0x17456d6712436e03611E10eeD593B198d58A8111 	|
    | Manager's Name            	| manager1                                   	|
    | Manager's Address         	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|
    | First Approver's Name     	| approver1                                  	|
    | First Approver's Address  	| 0x174D94B024b2db93999C858764FCbB34622D41f1 	|
    | Second Approver's Name    	| approver2                                  	|
    | Second Approver's Address 	| 0x1E8783a1fBB9848fd2B16dB15C34CCDE3D355a81 	|

<br><br>
**- Registration of Donor - https://msbd-5017.vercel.app/DonerRegistration**
  - This page is for registation of Donor. Below is the testing data for your reference.
  - You may use ETH address generator (e,g.: https://vanity-eth.tk/) to generate new address for testing.
    
    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Donor's Name              	| Donor1                                     	|
    | Donor's Address           	| 0x11409114A3CDbe71082bCf898850Fe0B0AFba181 	|

<br><br>
**- Registration of Receiver - https://msbd-5017.vercel.app/ReceiverRegistration**
  - This page is for registation of Receiver. Below is the testing data for your reference.
  - You may use ETH address generator (e,g.: https://vanity-eth.tk/) to generate new address for testing.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Receiver's Name           	| Receiver1                                  	|
    | Receiver's Address        	| 0x1118847900203Aab5d0E364d7F13aD5651fAd8E1 	|

<br><br>
**- Registration of Buyer (Buyer for buying donation with other digital asset) - https://msbd-5017.vercel.app/BuyerRegistration**
  - This page is for registation of Buyer. Below is the testing data for your reference.
  - You may use ETH address generator (e,g.: https://vanity-eth.tk/) to generate new address for testing.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Buyer's Name              	| Buyer1                                     	|
    | Buyer's Address           	| 0x1110BaDBdD57D45038a7ba8D6c3EE23e7cAE7Bf1 	|

<br><br>
**- Check Manager Page before Campaign Management - https://msbd-5017.vercel.app/CheckManagerPage**
  - This page checks if you're a manager first.  Below is the testing data for your reference.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Your Name              	 	 	| manager1                                   	|
    | Your Address           	 	 	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|

<br><br>
**- Manage Campaign - https://msbd-5017.vercel.app/CampaginManagementPage**
  - This page is for manager to manage the campaign.  Below is the testing data for your reference.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Manager' Address          	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|
    | Event Name                	| Event_Test1                                	|
    | Event Description         	| Event_Description1                         	|
    | Event Deadline            	| 06/01/2025                                 	|
    | Target Fund Raising       	| 100000                                     	|

<br><br>
**- Donation (only cover for domation of digital currency with HKD) - https://msbd-5017.vercel.app/donation**
  - This page is for donation of money.  Below is the testing data for your reference.

    | **Field**                            	| **Value**                                  	|
    |--------------------------------------	|--------------------------------------------	|
    | Your Address                         	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|
    | Choose a Campaign                    	| Event_Test1                                	|
    | Choose the amount you want to donate 	| Donate $50                                 	|

  - You will be re-directed to Stripe to continue with the payment. (Please DO NOT use your real payment information! This is for testing only).
  - Below is the testing data for your reference.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Email                     	| abc@abc.com                                	|
    | Your Address              	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|
    | Credit Card Number        	| 4242 4242 4242 4242                        	|
    | Expiry Date               	| 11/30                                      	|
    | CVS                       	| 111                                        	|
    | Card Holder Name          	| ABC                                        	|

<br><br>
**- Donation Tracking - https://msbd-5017.vercel.app/TraceDonation**
  - This page is for tracking of donated money.  Below is the testing data for your reference.

    | **Field**                 	| **Value**                                  	|
    |---------------------------	|--------------------------------------------	|
    | Transaction ID            	| ch_3OIRQ4AiHbmBADrr1FVJOFy0                	|

<br><br>

**- Donation Allocation -  https://msbd-5017.vercel.app/Allocation**
  - This page is for tracking of donated money.  Below is the testing data for your reference.

    | **Field**               	  | **Value**                                  	|
    |-----------------------------|--------------------------------------------	|
    | Choose a Receiver       	  | receiver1                                  	|
    | Allocation Amount       	  | 10                                         	|
    | Manager's Name            	| manager1                                   	|
    | Manager's Address         	| 0x2741cA6cdf158e127E84EE6fABBAED0b3356293a 	|
    | First Approver's Name     	| approver1                                  	|
    | First Approver's Address  	| 0x174D94B024b2db93999C858764FCbB34622D41f1 	|
    | Second Approver's Name    	| approver2                                  	|
    | Second Approver's Address 	| 0x1E8783a1fBB9848fd2B16dB15C34CCDE3D355a81 	|

