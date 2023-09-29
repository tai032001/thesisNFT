import React from "react";
import styles from "../styles/Gameplay.module.css";
// import EditionDropMetadata from "../types/EditionDropMetadata";
import { NFT } from "@thirdweb-dev/sdk";
import Image from "next/image";
const Monster = (
  <div className={styles.slide}>
    <Image src="/images/monster.gif" width="48" height="48" alt="monster" />
  </div>
);
type Props = {
  sword: NFT | undefined;
};
export default function GamePlayAnimation({ sword }: Props) {
  if (!sword) {
    return <div style={{ marginLeft: 8 }}>I need a sword!</div>;
  }
  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
        {Monster}
      </div>
    </div>
  );
}
