// "use client"
import CreateToken from "@/components/CreateToken";
import Image from "next/image";
import styles from "./page.module.css";

function ConnectButton() {
  return <w3m-button />;
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <ConnectButton />
          <CreateToken />
        </div>
      </div>
    </main>
  );
}
