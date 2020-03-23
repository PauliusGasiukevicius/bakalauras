module.exports = (app, mongoose) => {

    let CourseContent = require('../models/courseContentModel.js');
    let CourseContentSection = require('../models/courseContentSectionModel.js');
    let CourseContentSectionItem = require('../models/courseContentSectionItemModel.js');

    app.post('/editSection/:sectionId', async (req,resp) => {
        try{
            let {name} = req.body;
            await CourseContentSection.updateOne({_id: req.params.sectionId}, {name: name});
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/addSection/:courseId', async (req,resp) => {
        try{
            let content = await CourseContent.findOne({courseId: req.params.courseId});
            if(!content){
                console.log('WTF');
                content = new CourseContent({courseId: req.params.courseId, sections: []});
                content = await content.save();
            }
    
            let section = new CourseContentSection({name: req.body.name, items: [], courseId: req.params.courseId});
            section = await section.save();
    
            await CourseContent.updateOne({_id: content._id}, { $push: { sections: mongoose.Types.ObjectId(section._id) }});
            return resp.send(section.toObject());
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.delete('/deleteSection/:courseId/:sectionId', async (req,resp) => {
        try{
            let section = await CourseContentSection.findOne({_id: req.params.sectionId});
            await CourseContentSectionItem.deleteMany({_id: {$in: section.items}});
            await CourseContentSection.deleteOne({_id: req.params.sectionId});
            await CourseContent.updateOne({courseId: req.params.courseId}, {$pull: {sections: req.params.sectionId}});

            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/swapSections/:courseId/', async (req,resp) => {
        try{
            let {pos1,pos2} = req.body;
            if(pos1 > pos2)[pos1, pos2] = [pos2, pos1];
            let content = await CourseContent.findOne({courseId: req.params.courseId});
            let nwSections = content.toObject().sections;
            if(pos1 < 0 || pos2 >= nwSections.length)return resp.send({err: `Can't move element out of bounds`});
            [nwSections[pos1],nwSections[pos2]]=[nwSections[pos2],nwSections[pos1]];

            await CourseContent.updateOne({courseId: req.params.courseId}, {sections: nwSections});

            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}