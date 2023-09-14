import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CHARACTER_ADDRESS } from "../const/addresses";
export const ClaimCharacter = () => {
  const address = useAddress();
  const { contract: editionDrop } = useContract(
    CHARACTER_ADDRESS,
    "edition-drop"
  );

  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(editionDrop, { start: 0, count: 100 });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Choose character to play game</h1>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {nfts?.map((value, index) => (
          <div key={index}>
            <div className={styles.character}>
              <ThirdwebNftMedia
                metadata={value.metadata}
                height="200px"
                style={{ marginTop: "5px" }}
              />
              <p style={{ textAlign: "center" }}>
                Name character: <b>{value.metadata.name}</b>
              </p>
              <Web3Button
                theme="dark"
                style={{
                  width: "100%",
                  height: "20px",
                  marginBottom: "5px",
                }}
                contractAddress={CHARACTER_ADDRESS}
                action={(contract) =>
                  contract.erc1155.claim(value.metadata.id, 1)
                }
              >
                CHOOSE CHARACTER
              </Web3Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
