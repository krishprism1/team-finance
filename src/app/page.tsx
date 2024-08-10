// "use client"
import CreateToken from "@/components/CreateToken";
import CreatingVesting from "@/components/CreatingVesting";
import Footer from "@/components/dashboard/Footer";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import LockToken from "@/components/LockToken";
import MultiSender from "@/components/MultiSender";
import Image from "next/image";
import styles from "./page.module.css";


function ConnectButton() {
  return <w3m-button />;
}

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <div><ConnectButton /></div>
      <div className={styles.container}>
        <div className={styles.item}><CreateToken /></div>
      </div> */}

      <Header />
      <Sidebar />
      <Footer />
    </main>
  );
}
