let auth = require('../auth.js');

module.exports = (app, mongoose) => {
    
    let CourseUserProgress = require('../models/courseUserProgressModel.js');

    app.get(`/getUserCourseProgress/:courseId/:userId`, async (req,resp) => {
        let {courseId, userId} = req.params;

        let progress = await CourseUserProgress.findOne({courseId, userId});
        if(!progress){
            progress = new CourseUserProgress({courseId, userId, sections: [], items: [], badges: []});
            progress = await progress.save();
        }

        return resp.send(progress.toObject());
    });

    app.post('/markCheck/:courseId/:userId', auth, async (req,resp) => {
        try{
            let {courseId, userId} = req.params;
            let {idToToggle, isSection, user} = req.body;

            let progress = await CourseUserProgress.findOne({courseId, userId});
            if(!progress){
                progress = new CourseUserProgress({courseId, userId, sections: [], items: [], badges: []});
                progress = await progress.save();
            }
            progress = JSON.parse(JSON.stringify(progress.toObject()));

            if(isSection){
                if(progress.sections.indexOf(idToToggle) == -1)
                    await CourseUserProgress.updateOne({_id: progress._id}, {$push: {sections: idToToggle}});
                }
            else{
                if(progress.items.indexOf(idToToggle) == -1)
                    await CourseUserProgress.updateOne({_id: progress._id}, {$push: {items: idToToggle}});
                }
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/toggleCheck/:courseId/:userId', auth, async (req,resp) => {
        try{
            let {courseId, userId} = req.params;
            let {idToToggle, isSection, user, sectionId} = req.body;

            let progress = await CourseUserProgress.findOne({courseId, userId});
            if(!progress){
                progress = new CourseUserProgress({courseId, userId, sections: [], items: [], badges: []});
                progress = await progress.save();
            }
            progress = JSON.parse(JSON.stringify(progress.toObject()));

            if(isSection){
                if(progress.sections.indexOf(idToToggle) != -1){
                    await CourseUserProgress.updateOne({_id: progress._id}, {$pull: {sections: idToToggle}});}
                else{
                    await CourseUserProgress.updateOne({_id: progress._id}, {$push: {sections: idToToggle}});}
            }
            else{
                if(progress.items.indexOf(idToToggle) != -1){
                    await CourseUserProgress.updateOne({_id: progress._id}, {$pull: {items: idToToggle, sections: sectionId}});
                }
                else{
                    await CourseUserProgress.updateOne({_id: progress._id}, {$push: {items: idToToggle}});}
            }
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}