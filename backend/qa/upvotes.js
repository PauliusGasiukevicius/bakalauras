module.exports = (app, mongoose) => { 
    let Question = require(`../models/questionModel.js`);
    let Reply = require(`../models/replyModel.js`);
    let Upvote = require(`../models/userUpvotesModel.js`);

    app.get(`/upvotes/:courseId/:userId`, async (req,resp) => {
        try{
            let upvotes = await Upvote.find({userId: req.params.userId, courseId: req.params.courseId});
            return resp.send(upvotes);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post(`/upvotes`, async (req,resp) => {
        try{
            let upvote = await Upvote.findOne({objectId: req.body.objectId});
            if(upvote)
            {
                if(upvote.type == 'question') await Question.updateOne({_id: req.body.objectId}, {$inc: {upvotes: -1}});
                if(upvote.type == 'reply') await Reply.updateOne({_id: req.body.objectId}, {$inc: {upvotes: -1}});
                await Upvote.deleteOne({_id: upvote._id});
                return resp.send({ok: 'upvote cancelled', deletedId: upvote._id});
            }
            upvote = new Upvote({type: req.body.type, userId: req.body.user._id, courseId: req.body.courseId, objectId: req.body.objectId});
            upvote = await upvote.save();
            if(upvote.type == 'question') await Question.updateOne({_id: req.body.objectId}, {$inc: {upvotes: 1}});
            if(upvote.type == 'reply') await Reply.updateOne({_id: req.body.objectId}, {$inc: {upvotes: 1}});
            return resp.send(upvote);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}