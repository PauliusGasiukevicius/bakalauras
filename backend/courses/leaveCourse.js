let auth = require('../auth.js');

module.exports = (app, mongoose) => {

    let Course = require('../models/courseModel.js');
    let User = require('../models/userModel.js');

    app.post('/leaveCourse/:course_id/', auth, async (req, resp) => {
        let {user} = req.body;
        let {course_id} = req.params;
        if(!user.courses.includes(course_id))return resp.send({err: "already leaved"});

        let tmp = user.courses.slice(0);
        user.courses=[];
        for(let x of tmp)
            if(x != course_id)user.courses.push(x);

        let course = (await Course.findById(course_id)).toObject();
        course.students--;
        await Course.findOneAndUpdate({_id: course_id},course);
        await User.findOneAndUpdate({_id: user._id}, {$pull: {courses: course._id}});
        return resp.send(user);
    });
}