import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const router = useRouter();

  return (
    <div
      className={styles.playHeader}
      style={{ fontFamily: "cursive, Lucida Handwriting" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => router.back()}
      >
        <Image src={"/images/monster.gif"} alt="icon" width={20} height={20} />
        <h3>
          <b>Thesisnft</b>
        </h3>
      </div>
      <div>
        <ConnectWallet theme="dark" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="tooltip"
          viewBox="0 0 16 16"
          style={{ marginLeft: "15" }}
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        <Tooltip
          style={{
            display: "block",
            width: "300px",
            height: "300px",
            borderRadius: "10px",
            marginTop: "10px",
          }}
          anchorSelect=".tooltip"
        >
          <div>
            <h1>Game Rules</h1>
            <p>
              &#x2022;<b>Player only choose 1 character to play this game</b>
            </p>
            <p>
              &#x2022;
              <b>
                Player can buy one or many swords to upgrade speed of earning
                token
              </b>
            </p>
            <p>
              &#x2022;
              <b>
                After claim token, the game will stop and player can choose
                different sword to continue
              </b>
            </p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
