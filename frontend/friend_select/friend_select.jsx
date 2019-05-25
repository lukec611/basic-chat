import React, { useState, useEffect } from 'react';
import { ListPanel } from '../list_panel/list_panel';
import Axios from 'axios';

export const FriendSelect = React.memo((props) => {
    const myName = props.myName;
    const password = props.password;

    const [others, setOthers] = useState([]);

    useEffect(() => {
        (async function () {
            const { data } = await Axios.get(`/get-people?password=${password}`);
            setOthers(data.filter(x => x !== myName));
        })();
    });

    return (
        <ListPanel label="Chat with:" list={others} onSubmit={props.onSubmit}/>
    );
});

