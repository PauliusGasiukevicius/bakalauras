const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');

//Middle-ware
app.use(helmet());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.listen(process.env.PORT || 8080, () => {
    db.once('open', () => {
        require('./courses/courses.js')(app, mongoose);
        require('./courseContent/courseContent.js')(app, mongoose);
        require('./userGoogleLogin.js')(app, mongoose);
        require('./files.js')(app, mongoose);
        require('./qa/qa.js')(app, mongoose);
        require('./courseRating.js')(app, mongoose);
        require('./completion.js')(app, mongoose);
    });
});