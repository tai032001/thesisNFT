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

type Props = {
  miningContract: SmartContract<any>;
  tokenContract: Token;
};

export default function Rewards({ miningContract, tokenContract }: Props) {
  const address = useAddress();

  const { data: tokenMetadata } = useMetadata(tokenContract);
  const { data: currentBalance } = useTokenBalance(tokenContract, address);

  const { data: unclaimedAmount } = useContractRead(
    miningContract,
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
        Balance: <b>{currentBalance?.displayValue}</b>
      </p>
      <p>
        Unclaimed:{" "}
        <b>{unclaimedAmount && ethers.utils.formatUnits(unclaimedAmount)}</b>
      </p>

      <ApproxRewards miningContract={miningContract} />
      <Web3Button
        contractAddress={miningContract.getAddress()}
        action={(contract) => contract.call("claim")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
