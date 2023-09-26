import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { TOOL_ADDRESS } from "../const/addresses";

type Props = {
  swordContract: EditionDrop;
  item: NFT;
};

export default function ShopItems({ swordContract, item }: Props) {
  const { data: claimCondition } = useActiveClaimCondition(
    swordContract,
    item.metadata.id
  );
  return (
    <div className={styles.nftBox} key={item.metadata.id.toString()}>
      <ThirdwebNftMedia
        metadata={item.metadata}
        className={`${styles.nftMedia} ${styles.spacerTop}`}
        height="64px"
      />
      <h3>{item.metadata.name}</h3>
      <p>
        Price:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "}
          Monster Token
        </b>
      </p>

      <div className={styles.smallMargin}>
        <Web3Button
          style={{ width: "100%", marginBottom: "5px" }}
          theme="dark"
          contractAddress={TOOL_ADDRESS}
          action={(contract) => contract.erc1155.claim(item.metadata.id, 1)}
          onSuccess={() => alert("Purchased!")}
          onError={(error) => alert(error)}
        >
          Buy
        </Web3Button>
      </div>
    </div>
  );
}
