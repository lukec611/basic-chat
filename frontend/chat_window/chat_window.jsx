import React, { useState } from 'react';
import axios from 'axios';
import { ChatBubble } from '../chat_bubble/chat_bubble';
import styles from './chat_window.css';
import { ChatInput } from '../chat_input/chat_input';
/**
    type Message = {
        person: string; //name of person
        message: string; // message itself
        key?: string; // a unique key of the message
    }
 */

const POLL_INTERVAL_MS = 100;

function delay(ms = POLL_INTERVAL_MS) {
    return new Promise(r => setTimeout(r, ms));
}

/**
 * 
 * @param {string} from 
 * @param {string} message 
 */
function sendMessage(from, message) {
    axios.get(`/add-message?person=${from}&m=${message}`);
}

/**
 * 
 * @param {number|string} indexFrom 
 * @returns {Array<Message>}
 */
async function getMessages(indexFrom) {
    const { data: { list } } = await axios.get(`/get-messages-after?index=${indexFrom}`);
    return list;
}

function subscribe(indexFrom, callback) {
    let finished = false;
    (async () => {
        while(!finished) {
            await delay();
            if (!finished) {
                const messages = await getMessages(indexFrom);
                if (messages.length) callback(messages);
            }
        }
    })();
    return () => {
        finished = true;
    };
}

export const ChatWindow = React.memo((props) => {

    const [messages, setMessages] = useState([]);
    const myName = props.myName || 'unknown';
    const bottomElementRef = React.useRef(null);

    async function scrollToBottom() {
        await delay(100);
        if (!bottomElementRef.current) return;
        bottomElementRef.current.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(() => {
        scrollToBottom();
        return subscribe(messages.length, (newMessages) => {
            setMessages([...messages, ...newMessages]);
            scrollToBottom();
        });
    });

    function addMessage(message) {
        sendMessage(myName, message);
    }

    return (
        <div>
            <h1>Chat window</h1>
            {messages.map((m, index) =>
                <div key={index} className={styles.chatBubbleWrapper} >
                    <ChatBubble message={m.message} fromOther={m.person !== myName} />
                </div>
            )}
            <div ref={bottomElementRef} className={styles.invisibleElement}/>
            <ChatInput onSend={addMessage}/>
        </div>
    );
});