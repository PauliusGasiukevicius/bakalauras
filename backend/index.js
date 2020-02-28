const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//Middle-ware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(process.env.PORT || 8080, () => {
    db.once('open', () => {
        require('./courseCreation.js')(app, mongoose);
        require('./users.js')(app, mongoose);
    });
});