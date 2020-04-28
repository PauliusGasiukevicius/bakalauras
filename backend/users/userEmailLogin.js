const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({service: 'gmail',
auth: {user: 'e.learn.devs@gmail.com', pass: process.env.EMAIL_PASS}});

module.exports = (app, mongoose) => {

    let User = require('../models/userModel.js');
    let TempUser = require('../models/tempUserModel.js');
    let UserSession = require('../models/UserSessionModel.js');
    let ForgotPassword = require('../models/forgotPassModel.js');

    app.post('/resetPassword/:token', async (req, resp) => {
        try{
            let {pass, repeat} = req.body;
            
            let u = await ForgotPassword.findOne({_id: req.params.token});
            if(!u)return resp.send({err: 'Link expired or already used'});
            if(pass != repeat)return resp.send({err: 'passwords do not match'});

            let newPassHash = await bcrypt.hash(pass, 10);

            await ForgotPassword.deleteOne({_id: req.params.token});
            let user = await User.findOne({email: u.email});
            user.passwordHash = newPassHash;
            user = await user.save();

            return resp.send({ok: 'success'});

            }catch(err){console.log(err); return resp.send({err})};
          });

    app.get('/resetPassword', async (req, resp) => {
        try{
            let forgotPassId = req.query.token;
            
            let u = await ForgotPassword.findOne({_id: forgotPassId});
            if(!u)return resp.send('Link expired or already used');

            return resp.send(`
            <html>
	<head>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	</head>
	<body class="bg-dark text-white">
		<form class="form w-75 m-2 p-2 mx-auto">
		<input id="pass" class="form-control" type="password" placeholder="Enter new password" />
		<br/>
		<input id="pass2" class="form-control" type="password" placeholder="Confirm new password" />
		<button type="button" class="m-2 w-100 btn btn-outline-light" onclick="x()">Confirm</button>
		</form>
		
		<script>
		function x(){
			click();
		}
			let click = async () =>{
				let pass = document.getElementById('pass').value;
				let pass2 = document.getElementById('pass2').value;
				let resp = await fetch('/resetPassword/${req.query.token}',  {method: "POST", headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({pass, repeat: pass2})});
				let json = await resp.json();
				if(json.err)alert(json.err);
                else 
                {
                    alert('Success!');
                    window.href='${req.get('Host')}';
                }
			}
		</script>
	</body>
</html>
            `);

            }catch(err){console.log(err); return resp.send(err)};
          });

    app.post('/forgotPassword', async (req, resp) => {
        try{
            let {email} = req.body;
    
            let u = await User.findOne({email: email});
            if(!u || u.ID[0]=='G')return resp.send({err: 'Account does not exist or Google Login'});
    

            let forgot = new ForgotPassword({email: email});
            forgot = await forgot.save();

            await transporter.sendMail(
                {from: 'forgotPassword@e.learn.com',
                to: email,
                subject: 'Password Reset',
                text: `Click the link below to reset your password: \n http://${req.header('host')}/resetPassword?token=${forgot._id} \n\nThe link will expire in 24 hours. If you did not ask to reset your password you can ignore this email`},
            ); 
    
                return resp.send({ok: 'password reset link sent. Please check your email.'});
            }catch(err){console.log(err); return resp.send({err: err})};
    });

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

            await TempUser.deleteMany({email: user.email});
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