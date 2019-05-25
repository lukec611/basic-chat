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
 * @param {string} to 
 * @param {string} message 
 * @param {string} password 
 */
function sendMessage(from, to, message, password) {
    axios.get(`/add-message?person=${from}&m=${message}&other=${to}&password=${password}`);
}

/**
 * 
 * @param {number|string} indexFrom 
 * @param {string} myName 
 * @param {string} other 
 * @param {string} password
 * @returns {Array<Message>}
 */
async function getMessages(indexFrom, myName, other, password) {
    const { data: { list } } = await axios.get(`/get-messages-after?index=${indexFrom}&a=${myName}&b=${other}&password=${password}`);
    return list;
}

function subscribe(indexFrom, myName, otherName, password, callback) {
    let finished = false;
    (async () => {
        while(!finished) {
            await delay();
            if (!finished) {
                const messages = await getMessages(indexFrom, myName, otherName, password);
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
    const password = props.password || 'unknown';
    const chatWith = props.chatWith || 'unknown';
    const bottomElementRef = React.useRef(null);

    async function scrollToBottom() {
        await delay(100);
        if (!bottomElementRef.current) return;
        bottomElementRef.current.scrollIntoView({ behavior: "smooth" });
    }

    React.useEffect(() => {
        scrollToBottom();
        return subscribe(messages.length, myName, chatWith, password, (newMessages) => {
            setMessages([...messages, ...newMessages]);
            scrollToBottom();
        });
    });

    function addMessage(message) {
        sendMessage(myName, chatWith, message, password);
    }

    return (
        <div>
            <div className={styles.topBar}>
                <button className={styles.goBack} onClick={props.goBack}>go back</button>
            </div>
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