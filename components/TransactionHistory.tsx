import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { timeStamp } from "console";
const TransactionHistory = () => {
  const address = useAddress();
  const [transHistory, setTransHistory] = useState<any[]>([]);
  const headApiHistory =
    "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=";
  const tailApiHistory =
    "&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=TQJ8GQVQKW6UCKCTJ3R5UHWU5TZGEK1Y5C";
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `${headApiHistory}${address}${tailApiHistory}`
        );
        setTransHistory(res.data.result);
        console.log(`address:`, address);
        console.log(transHistory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, []);
  return (
    <div>
      TransactionHistory
      {transHistory?.map((value, index) => {
        return (
          <div key={index}>
            <p>From:{value.from}</p>
            <p>To:{value.to}</p>
            <p>Value{value.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;
