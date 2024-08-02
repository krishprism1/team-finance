// "use client"
import CreateToken from "@/components/CreateToken";
import CreatingVesting from "@/components/CreatingVesting";
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
      <div><ConnectButton /></div>
      <div className={styles.container}>
        <div className={styles.item}><CreateToken /></div>
        {/* <div className={styles.item}><CreatingVesting /></div>
        <div className={styles.item}><MultiSender /></div>
        <div className={styles.item}><LockToken /></div> */}
      </div>
    </main>
  );
}
