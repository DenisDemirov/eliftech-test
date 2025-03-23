import React from "react";
import styles from "./LoadingIcon.module.css";
import loadingIcon from "../../assets/loading.svg";

export default function LoadingIcon() {
    return (
        <div className={styles.loading}>
            <h3>Loading...</h3>
            <img src={loadingIcon} alt="Loading" className={styles.loadingIcon} />
        </div>
    );
}
