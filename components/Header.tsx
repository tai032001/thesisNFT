import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.playHeader}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => router.back()}
      >
        <Image src={"/images/monster.gif"} alt="icon" width={20} height={20} />
        <h3>
          <b>Thesisnft</b>
        </h3>
      </div>
      <ConnectWallet theme="dark" />
    </div>
  );
};

export default Header;
