import React from 'react';
import styles from './dialog.css';


export const Dialog = React.memo((props) => {
    return (
        <div className={styles.pane}>
            <div className={styles.box}>
                {props.children}
            </div>
        </div>
    );
});