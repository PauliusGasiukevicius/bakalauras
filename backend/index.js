const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet');
const enforce = require('express-sslify');

//Middle-ware
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    autoplay: ["'self'"],
    payment: ['paypal.com'],
    syncXhr: ["'none'"]
  }}));
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'cdn.tiny.cloud', 'i.imgur.com', 'code.jquery.com',
       'cdnjs.cloudflare.com', 'stackpath.bootstrapcdn.com', 'code.jquery.com',
        'accounts.google.com', 'maxcdn.bootstrapcdn.com', 'apis.google.com', 'sp.tinymce.com',
        'cdn.tiny.cloud'],
      styleSrc: ["'self'", 'stackpath.bootstrapcdn.com', 'maxcdn.bootstrapcdn.com',
        'cdn.tiny.cloud', "'unsafe-inline'"],
      upgradeInsecureRequests: true
    },
    reportOnly: true
  }));

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV != 'development')
    app.use(enforce.HTTPS({ trustProtoHeader: true }));

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
        require('./userLogin/userLogin.js')(app, mongoose);
        require('./files.js')(app, mongoose);
        require('./qa/qa.js')(app, mongoose);
        require('./courseRating.js')(app, mongoose);
        require('./completion.js')(app, mongoose);
    });
});