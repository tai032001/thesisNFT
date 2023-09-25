import React from "react";
import styles from "../styles/Home.module.css";
import TransactionHistory from "../components/TransactionHistory";
import DotLoader from "react-spinners/DotLoader";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useEditionDrop,
  useToken,
} from "@thirdweb-dev/react";
import CurrentGear from "../components/CurrentGear";
import OwnedGear from "../components/OwnedGear";
import Rewards from "../components/Rewards";
import Shop from "../components/Shop";

import {  
  CHARACTER_ADDRESS,
  GAMEPLAY_ADDRESS,
  TOOL_ADDRESS,
  TOKEN_ADDRESS,
} from "../const/addresses";

// const play = () => {

//   return (
//     <div >
//       play
//       <TransactionHistory />
//     </div>
//   );
// };

export default function play() {
  const address = useAddress();
  const { contract: miningContract } = useContract(GAMEPLAY_ADDRESS);
  const characterContract = useEditionDrop(CHARACTER_ADDRESS);
  const tokenContract = useToken(TOKEN_ADDRESS);
  const toolContract = useEditionDrop(TOOL_ADDRESS);

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* {
        miningContract && 
        characterContract &&
        tokenContract &&
        toolContract ? (
          <div className={styles.mainSection}>
            <CurrentGear
            miningContract={miningContract}
            characterContract={characterContract}
            toolContract={toolContract}
            />
            <Rewards 
              miningContract={miningContract}
              tokenContract={tokenContract}

            />
          </div>
        ) : (
          <div className={styles.container}>reward
            <DotLoader color="#800080" />
          </div>
        )} */}

        <hr className={`${styles.divider} ${styles.bigSpacerTop}`}/>

        {toolContract && miningContract ?(
          <>
           <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
            Your Owned Swords
           </h2>
           <div className={styles.shop}>
            <OwnedGear
              toolContract={tokenContract}
              miningContract={miningContract}
            />
           </div>
          </>
        ) : (
          <div className={styles.container}> sword
            <DotLoader color="#800080" />
          </div>
        )}

        <hr className={`${styles.divider} ${styles.bigSpacerTop}`}/>

        {toolContract && tokenContract ? (
          <>
          <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>SHOP</h2>
          <div className={styles.shop}>
           <Shop
             toolContract={tokenContract}
           />
          </div>
         </>
         ) : (
          <div className={styles.container}>shop
            <DotLoader color="#800080" />
          </div>
        )}
    </div>
  )
};
