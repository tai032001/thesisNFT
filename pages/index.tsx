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
import Header from "../components/Header";
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

  if (!address) {
    return (
      <div className={styles.container}>
        <div
          style={{
            textAlign: "center",
            fontFamily: "cursive, Lucida Handwriting",
          }}
        >
          <div className={styles.textSlide}>
            <h1>Welcome to our ThesisNFT game</h1>
            <h2>Please connect to your wallet to start playing</h2>
          </div>
          <div className={styles.buttonSlide}>
            <ConnectWallet theme="light" />
          </div>
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
      <>
        <Header />
        <div className={styles.container}>
          <ClaimCharacter />
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div
        style={{
          fontFamily: "cursive, Lucida Handwriting",
          paddingBottom: "140px",
        }}
        className={styles.container}
      >
        <div className={styles.textSlide}>
          <h1>Your current own character</h1>
        </div>
        {ownedNFTs.map((value, index) => (
          <div className={styles.buttonSlide} key={index}>
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
          className={`${styles.mainButton} ${styles.spacerBottom} ${styles.buttonSlide}`}
          onClick={() => router.push("/play")}
        >
          Play Game
        </button>
      </div>
    </>
  );
};

export default Home;
