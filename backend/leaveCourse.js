module.exports = (app, mongoose) => {

    let Course = require('./models/course.js');
    let User = require('./models/user.js');

    app.post('/leaveCourse/:course_id/', async (req, resp) => {
        let {user} = req.body;
        let {course_id} = req.params;

        if(!user.courses.includes(course_id))return resp.send({err: "already leaved"});

        let tmp = user.courses.slice(0);
        user.courses=[];
        for(let x of tmp)
            if(x != course_id)user.courses.push(x);

        let course = (await Course.findById(course_id)).toObject();
        if(course.creator == user._id)return resp.send({err: "Can't join a course you made yourself"});
        course.students--;
        await Course.findOneAndUpdate({_id: course_id},course);
        await User.findOneAndUpdate({_id: user._id}, user);
        return resp.send(user);
    });
}