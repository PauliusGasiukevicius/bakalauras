let auth = require('./auth.js');
let CourseUserProgress = require('./models/courseUserProgressModel.js');
let CourseContent = require('./models/courseContentModel.js');
let Completion = require('./models/Completion.js');
let Course = require('./models/courseModel.js');
let Badge = require('./models/badgeModel.js');
let User = require('./models/userModel.js');

module.exports = (app, mongoose) => {

    app.get('/complete/:courseId/:userId', async (req,resp) => {
        try{
            let comp = await Completion.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(comp != null)return resp.send(comp);
            return resp.send({err: 'User did not finish the course'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get('/badge/:badgeId', async (req,resp) => {
        try{
            if(!req.params.badgeId)return resp.send({err: 'course does not have a completion badge'});
            let b = await Badge.findOne({_id: req.params.badgeId});
            return resp.send(b);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('editbadge/:badgeId', async (req,resp) => {
        try{
            let b = await Badge.findOne({_id: req.params.badgeId});
            let {name,desc, imageUrl} = req.body;
            b.name = name;
            b.desc = desc;
            b.imageUrl = imageUrl;
            b = await b.save();
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
    app.get('/badgesOfUser/:userId', async (req,resp) => {
        try{
            let user = await User.findOne({_id: req.params.userId});
            let b = await Badge.find({_id: {$in: user.badges}});
            return resp.send(b);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/complete/:courseId', auth, async (req,resp) => {
        try{
            let user = req.body.user;

            let comp = await Completion.findOne({userId: user._id, courseId: req.params.courseId});
            if(comp != null)return resp.send({ok: 'succes'});
            
            let progress = await CourseUserProgress.findOne({userId: user._id, courseId: req.params.courseId});
            let content = await CourseContent.findOne({courseId: req.params.courseId});

            progress = new Set(progress.sections.map(x => ""+x));
            content = new Set(content.sections.map(x=> ""+x));

            for(let section of content)
            if(!progress.has(section))return resp.send({err: 'User did not finish the course'});

            let course = await Course.findOne({_id: req.params.courseId});
            if(!course.completionBadge)
            {
                let b = new Badge({name : course.name + " completion badge!",
                desc : "Congratulations for finishing the course!",
                courseId: req.params.courseId,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'});
                b = await b.save();

                course.completionBadge = b._id;
                course = await course.save();
            }

            await User.updateOne({_id: user._id}, {$push: {badges: course.completionBadge}});

            comp = new Completion({courseId: req.params.courseId, userId: user._id, date: new Date()});
            await comp.save();
            return resp.send({ok: 'succes'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}