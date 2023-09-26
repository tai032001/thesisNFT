import { useNFTs } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React from "react";
import styles from "../styles/Home.module.css";
import ShopItems from "./ShopItems";
type Props = {
  swordContract: EditionDrop;
};
const Shop = ({ swordContract }: Props) => {
  const { data: availableSword } = useNFTs(swordContract);
  return (
    <>
      <div className={styles.nftBoxGrid}>
        {availableSword?.map((p) => (
          <ShopItems
            swordContract={swordContract}
            item={p}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
};

export default Shop;
