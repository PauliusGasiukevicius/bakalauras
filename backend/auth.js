let UserSession = require('./models/UserSessionModel.js');

module.exports  = async (req, resp, next) => {
    try{
    if(!req.body.user._id)req.body.user = JSON.parse(req.body.user);
    let session = await UserSession.findOne({_id: req.body.user.token});
    if(session && session.userId == req.body.user._id)return next();
    return resp.send({err: 'Session expired, please relogin'});

    }catch(err){return resp.send({err: 'Session expired, please relogin'})};
};