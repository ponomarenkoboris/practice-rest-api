const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const app = express();


let CONTACTS = [
    {id: v4(), name: 'Boris', value: '9032682960', marked: false}
];
app.use(express.json());
//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS);
});
// POST
app.post('/api/contacts', (req, res) => {
    const contactNew = {...req.body, id: v4(), marked: false};
    CONTACTS.push(contactNew);
    res.status(201).json(contactNew);
});
//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Контакт был удалён'});
});
//PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[idx] = req.body;
    res.json(CONTACTS[idx]);
});

app.use(express.static(path.resolve(__dirname, 'client'))); // сделал папку статической 

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log(`Server has been started on port 3000...`));