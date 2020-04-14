const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({service: 'gmail',
auth: {user: 'e.learn.devs@gmail.com', pass: process.env.EMAIL_PASS}});

module.exports = (app, mongoose) => {

    let User = require('../models/userModel.js');
    let UserSession = require('../models/UserSessionModel.js');

    app.get(`/loginEmail`, async (req,resp) => {
    try{
        let token = req.query.token;
        let userSession = await UserSession.findOne({_id: token});
        if(!userSession)return resp.send({err: 'Link expired, please try again'});
        let user = await User.findOne({_id: userSession.userId});
        if(user)return resp.send({err: 'Not yet implemented'});
        return resp.send({err: 'Unexpected error occured'});
    }catch(err){console.log(err); return resp.send({err: err})};
    });

    app.post('/userEmail', async (req, resp) => {
        try{
        let email = req.body.email;

        let u = await User.findOne({email: email});
        if(!u){
            u = new User({
                ID: "E",
                name : email.substring(0, email.lastIndexOf("@")),
                email : email,
                imageUrl: '',
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

            await transporter.sendMail(
                {from: 'login@e.learn.com',
                to: email,
                subject: 'Sign in link',
                text: `Click the link below to sign in to the site: \n http://${req.header('host')}/loginEmail?token=${userSession._id} \n\nThe link will expire in 24 hours.`},
            ); 

            return resp.send({ok: 'email sign-in link sent'});
        }catch(err){console.log(err); return resp.send({err: err})};
      });
}