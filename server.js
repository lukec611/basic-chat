const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => res.sendFile('./public/index.html'));

let key = 0;
const messages = [];
const people = new Set();
const password = JSON.parse(fs.readFileSync('./pw.json'));

app.get('/login', (req, res) => {
    const name = req.query.name;
    const pw = req.query.password;
    if (password === pw) {
        people.add(name);
        res.json({ ok: true });
    } else {
        res.json({ ok: false });
    }
});

app.get('/get-people', (req, res) => {
    if (req.query.password !== password) return res.json([]);
    res.json([...people]);
});

app.get('/add-message', (req, res) => {
    const m = req.query.m || '';
    const p = req.query.person || 'unknown';
    const other = req.query.other || 'unknown';
    if (req.query.password !== password) return res.json({ ok: false });
    messages.push({
        message: m,
        person: p,
        other,
        key: key++,
    });
    res.json({ ok: true });
});

app.get('/get-messages-after', (req, res) => {
    let index = req.query.index;
    let personA = req.query.a;
    let personB = req.query.b;
    index = index ? Number(index) : 0;
    if (req.query.password !== password) return res.json({ ok: false });
    const submes = messages.filter(m => {
        if (m.person === personA) return true;
        if (m.other === personA) return true;
        if (m.person === personB) return true;
        if (m.other === personB) return true;
        return false;
    });
    const rv = submes.slice(index);
    res.json({
        list: rv,
        index,
        ok: true,
    });
});

app.listen(8686);