const auth = require('../auth.js');
const bcrypt = require('bcrypt');

module.exports = (app, mongoose) => {
    
    let User = require('../models/userModel.js');

    app.get(`/user/:userId`, async (req, resp) => {
        try{
            let user = await User.findOne({_id: req.params.userId});
            return resp.send(user);
        }catch(err){console.log(err); resp.status(500).send({err: err})};
    });

    app.post('/editProfile/:userId', auth, async (req, resp) => {
        try{
            let {name, pass, confirmPass, user, imageUrl} = req.body;

            if(req.params.userId != user._id)return resp.send({err: "you know why :P"});
            if(pass != confirmPass)return resp.send({err: 'passwords do not match'});

            let u = await User.findOne({_id: req.params.userId});
            u.name = name;
            if(pass.length > 0 && u.ID[0]=='E')u.passwordHash = await bcrypt.hash(pass, 10); 
            if(imageUrl)u.imageUrl = imageUrl;

            u = await u.save();
            
            return resp.send(u);
        }catch(err){console.log(err); resp.status(500).send({err: err})};
    });
}