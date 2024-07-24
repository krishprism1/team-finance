// "use client"
import CreateToken from "@/components/CreateToken";
import CreatingVesting from "@/components/CreatingVesting";
import Image from "next/image";
import styles from "./page.module.css";

function ConnectButton() {
  return <w3m-button />;
}

export default function Home() {
  return (
    <main className={styles.main}>
        <div className="container">
          <div className="item"><ConnectButton /></div>
          <div className="item"><CreateToken /></div>
          <div className="item"><CreatingVesting /></div>
        </div>
    </main>
  );
}
