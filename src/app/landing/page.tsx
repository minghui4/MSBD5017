import Link from "next/link";
import Image from 'next/image'
import styles from './page.module.css'


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign Up Page for Startup Nextjs Template",
  // other metadata
};

const LandingPage = () => {
  return (
    <main className={styles.main}>
    <div className={styles.grid}>
      <a
        href="/NGORegistration"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
         NGO <span>-&gt;</span>
        </h2>
        <p>This is for registration as a new NGO</p>

      </a>

      <a
        href="/DonerRegistration"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
        Doner  <span>-&gt;</span>
        </h2>
        <p>This is for registration as a new Doner.</p>

      </a>

      <a
        href="/ReceiverRegistration"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
        Receiver <span>-&gt;</span>
        </h2>
        <p>This is for registration as a new Receiver.</p>
      </a>

      <a
        href="/BuyerRegistration"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
        Buyer <span>-&gt;</span>
        </h2>
        <p>
        This is for registration as a new Buyer
        </p>
      </a>
      <a
        href="/CheckManagerPage"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>
         Manage Campagin <span>-&gt;</span>
        </h2>
        <p>This is for NGO to manage Campagin</p>
      </a>
    </div>
    <div className={styles.grid}>
    </div>
  </main>

  );
};

export default LandingPage;
