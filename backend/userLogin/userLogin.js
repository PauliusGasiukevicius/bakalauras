module.exports = (app, mongoose) => {

    require('./userEmailLogin.js')(app,mongoose);
    require('./userGoogleLogin.js')(app,mongoose);
    
    let UserSession = require('../models/UserSessionModel.js');

    let deleteOldSessions = async() => {
        try{
            await UserSession.deleteMany({creationDate: {$lt : new Date(Date.now() - 24*60*60 * 1000) }});
        setTimeout(deleteOldSessions, 1000 * 60 * 60);
        }catch(err){console.log(err)};
    }
    deleteOldSessions();
}