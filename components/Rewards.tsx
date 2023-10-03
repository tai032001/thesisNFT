import {
  ThirdwebNftMedia,
  useAddress,
  useContractWrite,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { SmartContract, Token } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import ApproxRewards from "../components/ApproxRewards";
import { GAMEPLAY_ADDRESS } from "../const/addresses";

type Props = {
  gameContract: SmartContract<any>;
  tokenContract: Token;
};

export default function Rewards({ gameContract, tokenContract }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);

  const { data: unclaimedAmount } = useContractRead(
    gameContract,
    "calculateRewards",
    [address]
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <p>
        Your <b>Gold Gems</b>
      </p>

      {tokenMetadata ? (
        // @ts-ignore
        <ThirdwebNftMedia metadata={tokenMetadata} height={"48px"} />
      ) : null}
      <p className={styles.noGapBottom}>
        User has owned: <b>{currentBalance?.displayValue} Monster Token</b>
      </p>
      <p>
        Unclaimed:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)}</b>
      </p>

      <ApproxRewards gameContract={gameContract} />
      <Web3Button
        contractAddress={GAMEPLAY_ADDRESS}
        action={(contract) => contract.call("withdraw")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
