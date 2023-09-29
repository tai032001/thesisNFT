import {
  ThirdwebNftMedia,
  useAddress,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Home.module.css";
import { GAMEPLAY_ADDRESS } from "../const/addresses";
import { DotLoader } from "react-spinners";
import Swal from "sweetalert2";
type Props = {
  swordContract: EditionDrop;
  gameContract: SmartContract<any>;
};

/**
 * This component shows the:
 * - Swords the connected wallet has
 * - A button underneath each of them to equip it
 */
export default function OwnedGear({ swordContract, gameContract }: Props) {
  const address = useAddress();
  const { data: ownedSword, isLoading } = useOwnedNFTs(swordContract, address);

  if (isLoading) {
    return (
      <div className={styles.playContainer}>
        <DotLoader color="#800080" />
      </div>
    );
  }

  async function equip(id: string) {
    if (!address) return;

    // The contract requires approval to be able to transfer the sword
    const hasApproval = await swordContract.isApproved(
      address,
      GAMEPLAY_ADDRESS
    );

    if (!hasApproval) {
      await swordContract.setApprovalForAll(GAMEPLAY_ADDRESS, true);
    }

    await gameContract.call("stake", [id]);

    // Refresh the page
    window.location.reload();
  }

  return (
    <>
      <div className={styles.nftBoxGrid}>
        {ownedSword?.map((ownedNft) => (
          <div className={styles.nftBox} key={ownedNft.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={ownedNft.metadata}
              className={`${styles.nftMedia} ${styles.spacerTop}`}
              height={"64px"}
            />
            <h3 style={{ textAlign: "center" }}>{ownedNft.metadata.name}</h3>

            <div className={styles.smallMargin}>
              <Web3Button
                style={{ width: "100%" }}
                theme="dark"
                contractAddress={GAMEPLAY_ADDRESS}
                action={() => equip(ownedNft.metadata.id)}
                onSuccess={() =>
                  Swal.fire("Equip", "Equip sword successfully", "success")
                }
              >
                Equip
              </Web3Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
