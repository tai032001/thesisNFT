import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React from "react";
import { MINING_ADDRESS } from "../const/addresses";
import {
    ThirdwebNftMedia,
    useAddress,
    useOwnedNFTs,
    Web3Button,
} from "@thirdweb-dev/react";
import DotLoader from "react-spinners/DotLoader";

type Props ={
    toolContract: EditionDrop;
    miningContract: SmartContract<any>;
};
 export default function OwnedGear({toolContract, miningContract}: Props) {
    const address = useAddress();
    const {data: ownedTool, isLoading} = useOwnedNFTs(
        toolContract,
        address
    );

    if (!isLoading) {
        return (
            <div className={styles.container}>
              <ConnectWallet />
            </div>
        );
    }

    async function equip(id:BigNumber) {
        if (!address) {
            return;
        }
        
        //the contract requires approval tobe able to transfer the tool
        const hasApproval = await toolContract.isApproved(
            address,
            MINING_ADDRESS
        );
    
        if (!hasApproval) {
            await toolContract.setApprovalForAll(MINING_ADDRESS, true);
        }
    
        await miningContract.call("stake", id);

        //refresh the page
        window.location.reload();
    }

    
 }