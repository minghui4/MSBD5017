import Link from "next/link";
import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
};

const LandingPage = () => {
  return (
    <main className={`${styles.main} py-12 bg-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Registration Portal</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Select Your Role</p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Please select the appropriate option based on your role to proceed with the registration.
          </p>
        </div>
        <div className={`${styles.grid} mt-10`}>
          <a href="/NGORegistration" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">NGO</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Register as a new NGO</p>
          </a>

          <a href="/DonerRegistration" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Donor</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Register as a new Donor</p>
          </a>

          <a href="/ReceiverRegistration" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Receiver</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Register as a new Receiver</p>
          </a>

          <a href="/BuyerRegistration" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Buyer</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Register as a new Buyer</p>
          </a>

          <a href="/CheckManagerPage" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Manage Campaign</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Manage your NGO&apos;s Campaign</p>
          </a>

          <a href="/donation" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2 className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Donation</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">Make donation to a campaign of NGO</p>
          </a>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;