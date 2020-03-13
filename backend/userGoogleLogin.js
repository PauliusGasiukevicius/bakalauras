const fetch = require('node-fetch');

module.exports = (app, mongoose) => {

    let User = require('./models/user.js');

    app.post('/userGoogle', (req, resp) => {
        fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.body.token)
        .then(res => res.json())
        .then(user => {
            if(!user.email)return resp.send({err: "Session has expired, plese relogin"});

            User.findOne({ID: "G"+req.body.googleId}, (err, res) => {
                if(err)return resp.send({err: "DB klaida"});
                if(res)return resp.send(res);

                //otherwise first time login:
                let u = new User({
                    ID: "G" + req.body.googleId,
                    name : user.name,
                    email : user.email,
                    imageUrl: user.imageUrl,
                    createdCourses: [],
                    courses: [],
                    badges: []
                });
                u.save((err,obj) => {
                    if(err)return resp.send({err: "DB klaida"});
                    return resp.send(obj);
                });
            });
        });
      });
}