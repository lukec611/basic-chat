import React, { useState } from "react";
import ReactDom from "react-dom";
import { ChatWindow } from './chat_window/chat_window';
import Axios from "axios";
import { FriendSelect } from './friend_select/friend_select';
import { LoginDialog } from './login_dialog/login_dialog';

const element = document.getElementById('react-app');

let initialState = {
    loggedIn: false,
    myName: '',
    password: '',
    chatWith: '',
    loading: false,
    error: '',
};
if (localStorage.getItem('loggedIn')) {
    initialState = {
        ...initialState,
        loggedIn: true,
        myName: localStorage.getItem('myName') || '',
        password: localStorage.getItem('password') || '',
        chatWith: localStorage.getItem('chatWith') || '',
    };
}

function logout() {
    localStorage.clear();
}

const Root = React.memo(() => {
    const [state, setState] = useState(initialState);

    async function login(name, password) {
        const state1 = {
            ...state,
            loading: true,
        };
        setState(state1);
        const { data } = await Axios.get(`/login?name=${name}&password=${password}`);
        if (data.ok) {
            setState({
                ...state1,
                loading: false,
                myName: name,
                password,
                loggedIn: true,
            });
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('password', password);
            localStorage.setItem('myName', name);
            return;
        }
        setState({
            ...state1,
            loading: false,
            error: 'wrong password...',
        });
    }

    function setChatWith(name) {
        setState({
            ...state,
            chatWith: name,
        });
        localStorage.setItem('chatWith', name);
    }

    
    if (state.loading) {
        return 'Loading...';
    }
    if (state.error) {
        return state.error;
    }

    if (!state.loggedIn) {
        return <LoginDialog key="submit-name" label="login" onSubmit={login}/>;
    }

    else if (!state.chatWith) {
        return <FriendSelect key="submit-chat-with" myName={state.myName} password={state.password} onSubmit={setChatWith}/>;
    }

    return (
        <div style={{ padding: '16px' }}>
            <ChatWindow
                myName={state.myName}
                password={state.password}
                chatWith={state.chatWith}
                goBack={() => setChatWith('')}
            />
        </div>
    );
});

const App = React.memo(() => <Root/>);


ReactDom.render(<App />, element);
