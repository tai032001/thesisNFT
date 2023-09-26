import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
//   import { CHARACTER } from "../const/contractAddress";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ContractMappingResponse from "../types/ContractMappingResponse";
//   import GameplayAnimation from "./GameplayAnimation";
type Props = {
  gameContract: SmartContract<any>;
  characterContract: EditionDrop;
  swordContract: EditionDrop;
};
const CurrentGear = ({
  gameContract,
  characterContract,
  swordContract,
}: Props) => {
  const address = useAddress();
  // const { contract: Character } = useContract(CHARACTER, "edition-drop");
  const { data: ownedNft } = useNFT(characterContract, 1);
  const [sword, setSword] = useState<NFT>();
  useEffect(() => {
    (async () => {
      if (!address) return;

      const p = (await gameContract.call("playerSword", [
        address,
      ])) as ContractMappingResponse;

      // Now we have the tokenId of the equipped sword, if there is one, fetch the metadata for it
      if (p.isData) {
        const swordMetadata = await swordContract.get(p.value);
        setSword(swordMetadata);
        console.log(sword);
      }
    })();
  }, [address, gameContract, swordContract, sword]);

  // console.log(ownedNft);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 className={`${styles.noGapTop} `}>Equipped Items</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Currently equipped player */}
        <div style={{ outline: "1px solid grey", borderRadius: 16 }}>
          {ownedNft && (
            <ThirdwebNftMedia
              metadata={ownedNft?.metadata}
              width="150px"
              height={"64px"}
            />
          )}
        </div>
        {/* Currently equipped pickaxe */}
        <div
          style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8 }}
        >
          {sword && (
            <ThirdwebNftMedia
              metadata={sword?.metadata}
              width="150px"
              height={"64px"}
            />
          )}
        </div>
      </div>

      {/* Gameplay Animation */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        {ownedNft && (
          <ThirdwebNftMedia
            metadata={ownedNft?.metadata}
            width={"100px"}
            height={"64px"}
          />
        )}
        {/* <GameplayAnimation sword={sword} /> */}
      </div>
    </div>
  );
};

export default CurrentGear;
