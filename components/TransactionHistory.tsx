import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
const TransactionHistory = () => {
  const address = useAddress();
  const [transHistory, setTransHistory] = useState<any[]>([]);
  const headApiHistory =
    "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=";
  const tailApiHistory =
    "&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=TQJ8GQVQKW6UCKCTJ3R5UHWU5TZGEK1Y5C";
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
    <div>
      Transaction History
      <div className={styles.transHistory}>
        {transHistory?.map((value, index) => {
          return (
            <div className={styles.historyInside} key={index}>
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
                {value.value}
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
