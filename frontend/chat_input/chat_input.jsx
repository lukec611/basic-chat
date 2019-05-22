import React from 'react';
import styles from './chat_input.css';


export const ChatInput = React.memo((props) => {

    const [text, setText] = React.useState('');
    function send() {
        const t = text;
        setText('');
        props.onSend && props.onSend(t);
    }
    function onKeyDown(event) {
        if (event.key === 'Enter') {
            send();
        }
    }

    return (
        <div className={styles.root}>
            <input className={styles.input} value={text} onChange={e => setText(e.target.value)} onKeyDown={onKeyDown}/>
            <button className={styles.sendButton} onClick={send}>send</button>
        </div>
    );
});

