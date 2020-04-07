module.exports = (app, mongoose) => {

    let Course = require('../models/courseModel.js');
    let File = require('../models/fileModel.js');

    app.delete('/deleteCourse/:course_id/', async (req, resp) => {
        let {user} = req.body;
        let {course_id} = req.params;

        let course = (await Course.findById(course_id)).toObject();
        if(course.creator != user._id)return resp.send({err: "cant delete course you didnt create"});

        await Course.findOneAndDelete({_id: course_id});
        await File.deleteMany({courseId: course._id});
        return resp.send({ok: 'ok'});
    });
}