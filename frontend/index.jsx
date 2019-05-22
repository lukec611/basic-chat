import React from "react";
import ReactDom from "react-dom";
import { Btn } from './C.jsx';

const element = document.getElementById('react-app');

function App() {
    return (
        <div>
            hello world
            <br/>
            <Btn/>
        </div>
    );
}

ReactDom.render(<App />, element);
