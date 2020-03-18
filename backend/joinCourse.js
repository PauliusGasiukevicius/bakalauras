module.exports = (app, mongoose) => {

    let Course = require('./models/courseModel.js');
    let User = require('./models/userModel.js');

    app.post('/joinCourse/:course_id/', async (req, resp) => {
        let {user} = req.body;
        let {course_id} = req.params;

        if(user.courses.includes(course_id))return resp.send({err: "already joined"});

        user.courses.push(course_id);

        let course = (await Course.findById(course_id)).toObject();
        if(course.creator == user._id)return resp.send({err: "Can't join a course you made yourself"});
        course.students++;
        await Course.findOneAndUpdate({_id: course_id},course);
        await User.findOneAndUpdate({_id: user._id}, user);
        return resp.send(user);
    });
}