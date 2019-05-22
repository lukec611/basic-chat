import React from "react";
import ReactDom from "react-dom";
import { Btn } from './C.jsx';
import { ChatBubble } from './chat_bubble/chat_bubble';
import { ChatInput } from './chat_input/chat_input';

const element = document.getElementById('react-app');

function getRandomMessage() {
    const words = ['cat', 'dog', 'word', 'you', 'me', 'house', 'tree', 'chat', 'awesome', 'happy'];
    const randomNumberBetween = (a, b) => Math.floor(Math.random() * (b-a)) + a; // excludes b
    const numberOfWords = randomNumberBetween(3, 41); // 5-40 random num words
    return Array.from({ length: numberOfWords }, () => words[randomNumberBetween(0, words.length)]).join(' ');
}

const N = 40;
const messages = Array.from({ length: N }).map(() => getRandomMessage());
const initialMessageList = messages.map((m, index) => ({
    message: m,
    fromOther: Math.random() < 0.1 ? ((index+1) % 2 === 0) : (index%2 === 0),
}));

function subscribe(add) {
    let finished = false;
    (async () => {
        while(!finished) {
            await new Promise(r => setTimeout(r, 2000));
            if (!finished) add('adding sth');
        }
    })();
    return () => {
        finished = true;
    };
}

const ChatWindow = React.memo(() => {

    const [messageList, setMessageList] = React.useState(initialMessageList);
    const bottomElementRef = React.useRef(null);

    async function scrollTo() {
        await new Promise(r => setTimeout(r, 100));
        if (!bottomElementRef.current) return;
        bottomElementRef.current.scrollIntoView({ behavior: "smooth" });
    }

    function addTypedMessage(str, fromOther = false) {
        setMessageList([...messageList, { message: str, fromOther }]);
        scrollTo();
    }

    React.useEffect(() => {
        // scrollTo();
        return subscribe((s) => addTypedMessage(s, true));

    });

    

    return (
        <div style={{ padding: '16px' }}>
            {messageList.map((m, index) =>
                <div key={index} style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column' }}>
                    <ChatBubble message={m.message} fromOther={m.fromOther} />
                </div>
            )}
            <div ref={bottomElementRef} style={{ height: '40px' }}></div>
            <ChatInput onSend={addTypedMessage}/>
            
        </div>
    );
});

const App = React.memo(() => <ChatWindow/>);


ReactDom.render(<App />, element);
