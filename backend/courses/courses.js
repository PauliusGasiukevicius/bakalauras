module.exports = (app, mongoose) => {

    let Course = require('../models/courseModel.js');
    let User = require('../models/userModel.js');

    require('./courseRating.js')(app,mongoose);
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

    app.get(`/courses/:skip/:need/:filter`, async (req,resp) => {
        try{
            let {filter,skip,need} = req.params;
            let courses = await Course.find({name: {$regex: filter, $options: 'i' }}).skip(skip|0).limit(need|0);
            return resp.send(courses);
        }catch(err){console.log(err);return resp.send({err})}
    });

    app.get(`/courses/:skip/:need`, async (req,resp) => {
        try{
            let {skip,need} = req.params;
            let courses = await Course.find({}).skip(skip|0).limit(need|0);
            return resp.send(courses);
        }catch(err){console.log(err);return resp.send({err})}
    });

    

    /*app.get('/courses', (req,resp) => {
        Course.find({}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });*/
}