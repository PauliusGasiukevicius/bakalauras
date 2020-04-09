const fetch = require('node-fetch');

module.exports = (app, mongoose) => {

    let User = require('./models/userModel.js');
    let UserSession = require('./models/UserSessionModel.js');

    let deleteOldSessions = async() => {
        try{
            await UserSession.deleteMany({creationDate: {$lt : new Date(Date.now() - 24*60*60 * 1000) }});
        setTimeout(deleteOldSessions, 1000 * 60 * 60);
        }catch(err){console.log(err)};
    }
    deleteOldSessions();

    app.post('/userGoogle', async (req, resp) => {
        try{
        let res = await fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + req.body.token);
        let user = await res.json();

        if(!user.email)return resp.send({err: "Session has expired, plese relogin"});

            let u = await User.findOne({ID: "G"+req.body.googleId});
            if(!u){
                u = new User({
                    ID: "G" + req.body.googleId,
                    name : user.name,
                    email : user.email,
                    imageUrl: user.imageUrl,
                    createdCourses: [],
                    courses: [],
                    badges: []
                });
                u = await u.save();
            }

            u = u.toObject();
            let userSession = await UserSession.findOne({userId: u._id});
            if(!userSession){
                userSession = new UserSession({userId: u._id, creationDate: new Date()});
                userSession = await userSession.save();
            }
            u.token = userSession._id;
            return resp.send(u);
        }catch(err){console.log(err)};
      });
}