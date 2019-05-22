import React from "react";
import style from './cool.css';

export function Btn() {
    return (
        <button className={style.dark}>click me {style.dark}</button>
    );
}