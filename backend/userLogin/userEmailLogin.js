const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({service: 'gmail',
auth: {user: 'e.learn.devs@gmail.com', pass: process.env.EMAIL_PASS}});

module.exports = (app, mongoose) => {

    let User = require('../models/userModel.js');
    let TempUser = require('../models/tempUserModel.js');
    let UserSession = require('../models/UserSessionModel.js');

    app.get('/verifyEmail', async (req, resp) => {
        try{
            let tempUserId = req.query.token;
            
            let u = await TempUser.findOne({_id: tempUserId});
            if(!u)return resp.send('Link expired or already used');

            let user = new User({
                ID: 'E',
                passwordHash: u.passwordHash,
                name : u.name,
                email : u.email,
                imageUrl: '',
                courses: [],
                badges: []
            });

            user = await user.save();

            return resp.send(`<html>
                <head>
                    <meta http-equiv = "refresh" content = "3; url = '/' " />
                </head>
                <body>
                    Success!. You will be redirected to home in 3 seconds...
                </body>
            </html>`);

            }catch(err){console.log(err); return resp.send(err)};
          });

    app.post('/loginEmail', async (req, resp) => {
        try{
            let email = req.body.email;
            
            let u = await User.findOne({email: email});
            if(!u)return resp.send({err: 'User not registered, please register first before loggin in (or use google auth)'});
            if(u.ID[0]=='G')return resp.send({err: 'Email already in use by Google auth, use google auth to sign in'});
            const match = await bcrypt.compare(req.body.pass, u.passwordHash);
            if(!match)return resp.send({err: 'password or email is incorrect, please try again'});

            let userSession = await UserSession.findOne({userId: u._id});
            if(!userSession){
                userSession = new UserSession({userId: u._id, creationDate: new Date()});
                userSession = await userSession.save();
            }

            u = u.toObject();
            u.token = userSession._id;

            return resp.send(u);

            }catch(err){console.log(err); return resp.send({err: err})};
          });

    app.post('/registerEmail', async (req, resp) => {
        try{
        let {email, pass, confirmPass, name} = req.body;

        let u = await User.findOne({email: email});
        if(u)return resp.send({err: 'Email already in use'});
        if(pass != confirmPass)return resp.send({err: 'passwords do not match'});

        let pwHash = await bcrypt.hash(pass, 10);

        u = new TempUser({email, passwordHash: pwHash, name});
        u = await u.save();

        await transporter.sendMail(
            {from: 'login@e.learn.com',
            to: email,
            subject: 'Verify email for E-Learn site',
            text: `Click the link below to verify your email: \n http://${req.header('host')}/verifyEmail?token=${u._id} \n\nThe link will expire in 24 hours.`},
        ); 

            return resp.send({ok: 'email verification link sent. Please check your email.'});
        }catch(err){console.log(err); return resp.send({err: err})};
      });
}