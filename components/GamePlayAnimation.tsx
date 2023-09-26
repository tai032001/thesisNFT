import React from "react";
import styles from "../styles/Home.module.css";
import EditionDropMetadata from "../types/EditionDropMetadata";
const GoldGem = (
    <div className={styles.slide}>
        <img src="../public/images/gold-pixel-coin-animation.gif" height="48" width="48" alt="gold-gem"/>
    </div>
);
type Props = {
    pickaxe: EditionDropMetadata | undefined
};
export default function GamePlayAnimation({tool}: Props){
    if (!tool) {
        return <div style={{marginLeft:8}}>I need a sword!</div>
    }
    return (
        <div className={styles.slider}>
            <div className={styles.slideTrack}>
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               {GoldGem}
               
            </div>
        </div>
    );
}