module.exports = (app, mongoose) => {

    let CourseContent = require('./models/courseContentModel.js');
    let CourseContentSection = require('./models/courseContentSectionModel.js');
    let CourseContentSectionItem = require('./models/courseContentSectionItemModel.js');

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

    app.post('/addItem/:courseId/:sectionId', async (req,resp) => {
    try{
        let {name, location, type} = req.body;

        let item = new CourseContentSectionItem({courseId : req.params.courseId, name: name, location: location, type: type});
        item = await item.save();

        await CourseContentSection.updateOne({_id: req.params.sectionId}, {$push: {items: mongoose.Types.ObjectId(item._id)}});
        return resp.send(item.toObject());
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

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

        for(let i=0; i<sections.length; i++)
            {
                if(sections[i]._id in sectionPos)
                {
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

    /*
        Everything should have courseId so that user can have something like checked items array
        Lets save stuff like, here course content holds array for sections
        then each section has name and hold array of items
        then each item has name, location, type, text, reference (null usually but can hold 
                                Id for quizz or something if I decide to add that in the future)
        need routes for:
        +   POST: addSection + create courseContent if does not exist
        +   POST: addItem
        +   GET: Get all courseContent data
            DELETE: Section <-- clean everythinh, sections array entry, all items, section itself
            DELETE: Item <-- clean everythinh, items array entry, item itself
            POST: Move Sections
            POST: Move Items
    */
}