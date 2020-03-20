module.exports = (app, mongoose) => {

    let CourseContent = require('../models/courseContentModel.js');
    let CourseContentSection = require('../models/courseContentSectionModel.js');
    let CourseContentSectionItem = require('../models/courseContentSectionItemModel.js');

    require('./sections.js')(app,mongoose);
    require('./items.js')(app,mongoose);

    app.get('/getCourseContent/:courseId', async (req,resp) => {
    try{
        let content = await CourseContent.findOne({courseId: req.params.courseId});
        if(!content){
            content = new CourseContent({courseId: req.params.courseId, sections: []});
            content = await content.save();
        }

        let data = content.toObject();
        let sectionPos = {};

        for(let i=0; i<data.sections.length; i++)
            sectionPos[data.sections[i]]=i;

        let sections = await CourseContentSection.find({courseId: req.params.courseId});

        let itemPos = {};

        for(let i=0; i<sections.length; i++){
                if(sections[i]._id in sectionPos){
                    data.sections[sectionPos[sections[i]._id]]=sections[i].toObject();
                    for(let j=0; j<sections[i].items.length; j++)
                        itemPos[sections[i].items[j]] = [sectionPos[sections[i]._id],j];
                }
            }
        
        let items = await CourseContentSectionItem.find({courseId: req.params.courseId});

        for(let i=0; i<items.length; i++)
            if(items[i]._id in itemPos)
            data.sections[itemPos[items[i]._id][0]].items[itemPos[items[i]._id][1]] = items[i].toObject();

        return resp.send(data.sections);
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}