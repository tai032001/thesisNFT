import React from "react";
import styles from "../styles/Home.module.css";
import TransactionHistory from "../components/TransactionHistory";
import DotLoader from "react-spinners/DotLoader";
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
// import CurrentGear from "../components/CurrentGear";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";

import {
  CHARACTER_ADDRESS,
  GAMEPLAY_ADDRESS,
  TOOL_ADDRESS,
  TOKEN_ADDRESS,
} from "../const/addresses";
import Header from "../components/Header";
import CurrentGear from "../components/CurrentGear";

// import styles from "../styles/Home.module.css";
export function PlayPage() {
  const address = useAddress();
  const { contract: gameContract } = useContract(GAMEPLAY_ADDRESS);
  const { contract: characterContract } = useContract(
    CHARACTER_ADDRESS,
    "edition-drop"
  );
  const { contract: tokenContract } = useContract(TOKEN_ADDRESS, "token");
  const { contract: swordContract } = useContract(TOOL_ADDRESS, "edition-drop");

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className={styles.playContainer}>
        {gameContract && characterContract && tokenContract && swordContract ? (
          <div className={styles.mainSection}>
            <CurrentGear
              gameContract={gameContract}
              characterContract={characterContract}
              swordContract={swordContract}
            />
            <Rewards
              miningContract={gameContract}
              tokenContract={tokenContract}
            />
          </div>
        ) : (
          <div className={styles.container}>
            <DotLoader color="#800080" />
          </div>
        )}

        <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

        {swordContract && gameContract ? (
          <>
            <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
              Your Owned Swords
            </h2>
            <div className={styles.shop}>
              <OwnedGear
                swordContract={swordContract}
                gameContract={gameContract}
              />
            </div>
          </>
        ) : (
          <div className={styles.container}>
            {" "}
            sword
            <DotLoader color="#800080" />
          </div>
        )}

        <hr className={`${styles.divider} ${styles.bigSpacerTop}`} />

        {swordContract && tokenContract ? (
          <>
            <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>SHOP</h2>
            <div className={styles.shop}>
              <Shop swordContract={swordContract} />
            </div>
          </>
        ) : (
          <div className={styles.container}>
            shop
            <DotLoader color="#800080" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayPage;
