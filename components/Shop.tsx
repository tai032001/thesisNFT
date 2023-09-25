import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { EditionDrop } from "@thirdweb-dev/sdk";
import React, { useEffect } from "react";
import ShopItem from "../components/ShopItem";
import styles from "../styles/Home.module.css";

type Props = {
    toolContract: EditionDrop;
};

export default function Shop({toolContract}:Props) {
    const { data: availableTool } = useNFTs(toolContract);

    return (
        <>
            <div className= {styles.nftBoxGrid}>
                {availableTool?.map((p)=>(
                    <ShopItem
                        toolContract={toolContract}
                        item={p}
                        key={p.metadata.id.toString()}
                    />
                ))}
            </div>
        </>
    );
}