const express = require('express');

const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => res.sendFile('./public/index.html'));

let key = 0;
const messages = [];

app.get('/add-message', (req, res) => {
    const m = req.query.m || '';
    const p = req.query.person || 'unknown';
    messages.push({
        message: m,
        person: p,
        key: key++,
    });
    console.log(messages);
    res.json({ ok: true });
});

app.get('/get-messages-after', (req, res) => {
    let index = req.query.index;
    index = index ? Number(index) : 0;
    const rv = messages.slice(index);
    console.log(rv);
    res.json({
        list: rv,
        index,
    });
});

app.listen(8080);