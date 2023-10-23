import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
const TransactionHistory = () => {
  const address = useAddress();
  const [transHistory, setTransHistory] = useState<any[]>([]);
  const headApiHistory =
    "https://api-sepolia.etherscan.io/api?module=account&action=tokentx&contractaddress=0x5c47f10146A6F4d1BE01Eb0eb45556e331eeEc44&address=";
  const tailApiHistory =
    "&page=1&offset=4&startblock=0&endblock=99999999&sort=desc&apikey=TQJ8GQVQKW6UCKCTJ3R5UHWU5TZGEK1Y5C";
  useEffect(() => {
    const FetchHistory = async () => {
      try {
        const res = await axios.get(
          `${headApiHistory}${address}${tailApiHistory}`
        );
        setTransHistory(res.data.result);
        console.log(`address:`, address);
        console.log(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    FetchHistory();
  }, [address]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className={`${styles.noGapTop} ${styles.noGapBottom}`}>
        TRANSACTIONS HISTORY
      </h2>
      <div className={styles.transHistory}>
        {transHistory?.map((value, index) => {
          return (
            <div className={styles.historyInside} key={index}>
              <p>{index + 1}</p>
              <p>
                <b>From:</b>
                {value.from}
              </p>
              <p>
                <b>To:</b>
                {value.to}
              </p>
              <p>
                <b>Value:</b>
                {ethers.utils.formatEther(value.value)} Monster Token
              </p>
              <p>
                <b>Date:</b>
                {new Date(value.timeStamp * 1000).toDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
