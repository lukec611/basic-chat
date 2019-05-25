import React, { useState } from 'react';
import { Dialog } from '../dialog_input/dialog';
import styles from './login_dialog.css';

export const LoginDialog = React.memo((props) => {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');


    function submit() {
        props.onSubmit && props.onSubmit(input, password);
    }

    function updateInput(e) {
        setInput(e.target.value);
    }
    function updatePassword(e) {
        setPassword(e.target.value);
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
                <input className={styles.input} value={input} onChange={updateInput}/>
                <input type="password" className={styles.input} value={password} onChange={updatePassword} onKeyDown={onKeyDown} />
                <button className={styles.submitButton} onClick={submit}>submit</button>
            </div>
        </Dialog>
    );
});