// "use client"
import CreatingVesting from "@/components/CreatingVesting";
import LockNFT from "@/components/LockNFT";
import LockToken from "@/components/LockToken";
import MultiSender from "@/components/MultiSender";
import Stake from "@/components/Stake";
import styles from "../page.module.css";

function ConnectButton() {
  return <w3m-button />;
}

export default function Vesting() {
  return (
    <main className={styles.main}>
      <div><ConnectButton /></div>
      <div className={styles.container}>
        <div className={styles.item}><CreatingVesting /></div>
        <div className={styles.item}><MultiSender /></div>
        <div className={styles.item}><LockToken /></div>
        <div className={styles.item}><LockNFT /></div>
        <div className={styles.item}><Stake /></div>
      </div>
    </main>
  );
}
