import React from 'react';
import styles from './chat_bubble.css';

export const ChatBubble = React.memo((props) => {
    const { message, fromOther } = props;
    const className = fromOther
        ? styles.component + ' ' + styles.other
        : styles.component;
    return (
        <div className={className}>
            {message}
        </div>
    );
});
