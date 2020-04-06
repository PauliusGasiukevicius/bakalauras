module.exports = (app, mongoose) => {
    
    let CourseUserProgress = require('./models/courseUserProgressModel.js');
    let CourseContent = require('./models/courseContentModel.js');
    let Completion = require('./models/Completion.js');

    app.get('/complete/:courseId/:userId', async (req,resp) => {
        try{
            let comp = await Completion.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(comp != null)return resp.send(comp);
            return resp.send({err: 'User did not finish the course'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/complete/:courseId', async (req,resp) => {
        try{
            let user = req.body.user;

            let comp = await Completion.findOne({userId: user._id, courseId: req.params.courseId});
            if(comp != null)return resp.send({ok: 'succes'});
            
            let progress = await CourseUserProgress.findOne({userId: user._id, courseId: req.params.courseId});
            let content = await CourseContent.findOne({courseId: req.params.courseId});

            if(progress.sections.length != content.sections.length)return resp.send({err: 'User did not finish the course'});

            comp = new Completion({courseId: req.params.courseId, userId: user._id, date: new Date()});
            await comp.save();
            return resp.send({ok: 'succes'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}