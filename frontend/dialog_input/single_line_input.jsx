import React, { useState } from 'react';
import { Dialog } from './dialog';
import styles from './single_line_input.css';

export const SingleLineInput = React.memo((props) => {
    const [input, setInput] = useState('');


    function submit() {
        props.onSubmit && props.onSubmit(input);
    }

    function updateInput(e) {
        setInput(e.target.value);
    }

    function onKeyDown(event) {
        if (event.key === 'Enter') {
            submit();
        }
    }

    return (
        <Dialog>
            <div className={styles.root}>
                <div className={styles.label}>{props.label}</div>
                <input className={styles.input} value={input} onChange={updateInput} onKeyDown={onKeyDown} />
                <button className={styles.submitButton} onClick={submit}>submit</button>
            </div>
        </Dialog>
    );
});