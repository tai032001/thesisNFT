import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "../types/ContractMappingResponse";
import EditionDropMetadata from "../types/EditionDropMetadata";
import GamePlayAnimation from "./GamePlayAnimation";
import styles from "../styles/Home.module.css";

type Props = {
    miningContract: SmartContract<any>;
    characterContract: EditionDrop;
    toolContract: EditionDrop;
};
export default function CurrentGear({
    miningContract,
    characterContract,
    toolContract,
}: Props) {
    const address = useAddress();

    const { data: playerNft} = useNFT(characterContract, 0);
    const [tool, setTool] = useState<EditionDropMetadata>();

    useEffect (() => {
        (async () => {
            if (!address) {
                return;
            }
            const p = (await miningContract.call(
                "playerSword",
                address
            )) as ContractMappingResponse;
            if(p.isData){
                const toolMetadata = await toolContract.get(p.value);
                setTool(toolMetadata);
            }
        })();
    }, [address, miningContract, toolContract]);

    return (
        <div style = {{ display: "flex", flexDirection: "column"}}>
            <h2 className={`${styles.noGapTop}`}>Equipped Items</h2>
            <div
                style={{
                    display:"flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center", 
                }}
            >
                {/*currently equipped played*/}
                <div style={{ outline: "1px solid grey", borderRadius: 16}}>
                    {playerNft && (
                        <ThirdwebNftMedia metadata={playerNft?.metadata} height={"64"}/>
                    )}
                </div>
                {/*currently equipped played*/}
                <div style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8}}>
                    {tool && (
                        <ThirdwebNftMedia metadata={tool.metadata} height={"64"}/>
                    )}
                </div>
            </div>
            {/* gameplay animation */}

            <div 
                style={{
                    display:"flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center", 
                    marginTop: 24,
                }}
            >
                <img src="F../public/images/male.gif" height={64} width={64} alt="character-mining"/>
                <GamePlayAnimation tool= {tool}/>
            </div>
        </div>
    );
}