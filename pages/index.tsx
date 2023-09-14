import styles from "../styles/Home.module.css";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import DotLoader from "react-spinners/DotLoader";
import { CHARACTER_ADDRESS } from "../const/addresses";
import { ClaimCharacter } from "../components/ClaimCharacter";
const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(
    CHARACTER_ADDRESS,
    "edition-drop"
  );
  const address = useAddress();
  const router = useRouter();
  const {
    data: ownedNFTs,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);
  // console.log(ownedNFTs);

  if (!address) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: "center" }}>
          <h1>Welcome to our ThesisNFT game</h1>
          <p>Please connect to your wallet to play this game</p>
          <ConnectWallet theme="light" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <DotLoader color="#800080" />
      </div>
    );
  }

  if (isError || !ownedNFTs) {
    return <div>Error</div>;
  }

  if (ownedNFTs.length === 0) {
    return (
      <div className={styles.container}>
        <ClaimCharacter />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Your current own character</h1>
      {ownedNFTs.map((value, index) => (
        <div key={index}>
          <div className={styles.character} style={{ marginBottom: "15px" }}>
            <ThirdwebNftMedia
              metadata={value.metadata}
              width="300px"
              style={{ borderRadius: "10px" }}
            />
            <p style={{ textAlign: "center" }}>
              <b>{value.metadata.name}</b>
            </p>
          </div>
        </div>
      ))}
      <button
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        onClick={() => router.push("/play")}
      >
        Play Game
      </button>
    </div>
  );
};

export default Home;
