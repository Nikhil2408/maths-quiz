import React from "react";

import styles from "../styles/TotalScores.module.css";

function TotalScores(props){
    return (
        <div className={styles.TotalScores}>
            <h4>Total Score is : {props.totalScores}</h4>
        </div>
    )
}

export default TotalScores;