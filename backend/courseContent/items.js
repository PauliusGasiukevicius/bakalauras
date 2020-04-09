let auth = require('../auth.js');

module.exports = (app, mongoose) => {
    
    let CourseContentSection = require('../models/courseContentSectionModel.js');
    let CourseContentSectionItem = require('../models/courseContentSectionItemModel.js');
    let File = require('../models/fileModel.js');

    app.post(`/editItem/:itemId`, auth, async (req, resp) => {
        try{
            let {name, type, content, location} = req.body;
            //upload file to imgur/youtube/DB and save get path here if its larger than ~2MB

            let item = await CourseContentSectionItem.findOne({_id: req.params.itemId});
            item.name = name;
            item.type = type;
            item.content = content;
            item.location = location;
            
            item = await item.save();

            return resp.send(item.toObject());
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/addItem/:courseId/:sectionId', auth, async (req,resp) => {
        try{
            let {name, type, content, location} = req.body;
    
            let item = new CourseContentSectionItem({courseId : req.params.courseId, name: name, location: location, type: type, content: content});
            item = await item.save();

            if(location.startsWith(`/file/`)){
                let id = location.substr(6);
                await File.updateOne({_id: id}, {courseId: req.params.courseId, itemId: item._id, sectionId: req.params.sectionId});
            }
    
            await CourseContentSection.updateOne({_id: req.params.sectionId}, {$push: {items: mongoose.Types.ObjectId(item._id)}});
            return resp.send(item.toObject());
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.delete('/deleteItem/:sectionId/:itemId', auth, async (req,resp) => {
        try{
            await CourseContentSectionItem.deleteOne({_id: req.params.itemId});
            await CourseContentSection.updateOne({_id: req.params.sectionId}, {$pull: {items: req.params.itemId}});
            await File.deleteOne({itemId: req.params.itemId});

            return resp.send({ok: 'success'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/swapItems/:sectionId/', auth, async (req,resp) => {
        try{
            let {pos1,pos2} = req.body;
            if(pos1 > pos2)[pos1, pos2] = [pos2, pos1];
            let section = await CourseContentSection.findOne({_id: req.params.sectionId});
            let nwSitems = section.toObject().items;
            if(pos1 < 0 || pos2 >= nwSitems.length)return resp.send({err: `Can't move element out of bounds`});
            [nwSitems[pos1],nwSitems[pos2]]=[nwSitems[pos2],nwSitems[pos1]];

            await CourseContentSection.updateOne({_id: req.params.sectionId}, {items: nwSitems});

            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}