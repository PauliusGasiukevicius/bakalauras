module.exports = (app, mongoose) => {

    let Course = require('./models/courseModel.js');
    let User = require('./models/userModel.js');

    require('./createCourse.js')(app, mongoose);
    require('./joinCourse.js')(app, mongoose);
    require('./leaveCourse.js')(app, mongoose);
    require('./deleteCourse.js')(app, mongoose);

    app.get('/courses/user/teach/:id', (req,resp) => {
        Course.find({creator: req.params.id}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });

    app.get('/courses/user/study/:id', async (req,resp) => {
        let user = await User.findOne({_id: req.params.id});
        let courses = await Course.find({'_id': {$in: user.courses}});
        return resp.send(courses);
    });

    app.get('/courses', (req,resp) => {
        Course.find({}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });
}