import React from 'react';
import styles from './list_panel.css';


export const ListPanel = React.memo((props) => {

    let Label;
    if (props.label) {
        Label = <div className={styles.label}>{props.label}</div>;
    }

    function selectItem(item) {
        props.onSubmit && props.onSubmit(item);
    }

    const list = props.list || [];


    return (
        <div className={styles.root}>
            {Label}
            {list.map((item, index) => (
                <div key={index} className={styles.item} onClick={() => selectItem(item)}>
                    {item}
                </div>
            ))}
        </div>
    );
});


