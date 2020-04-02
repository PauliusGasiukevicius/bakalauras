module.exports = (app, mongoose) => { 
    let Question = require(`../models/questionModel.js`);
    let Reply = require(`../models/replyModel.js`);
    let Upvote = require(`../models/userUpvotesModel.js`);

    app.delete(`/reply/:replyId`, async (req, resp) => {
        try{
            await Reply.deleteOne({_id: req.params.replyId});
            await Question.updateOne({_id: req.params.questionId}, {$inc: {replies: -1}});
            await Upvote.deleteOne({objectId: req.params.replyId});
        return resp.send({ok: 'success'});  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post(`/reply/:questionId`, async (req, resp) => {
        try{
        let {content, user} = req.body;
        let time = new Date();            
        let reply = new Reply({questionId: req.params.questionId, userId: user._id, userName: user.name, content: content, creation_date: time, edit_date: time, upvotes: 0});
        reply = await reply.save();
        await Question.updateOne({_id: req.params.questionId}, {$inc: {replies: 1}});

        return resp.send(reply);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.put(`/reply/:replyId`, async (req, resp) => {
        try{
        let reply = await Reply.findOne({_id: req.params.replyId});
        let {content} = req.body;
        reply.content = content;
        reply.edit_date = new Date();  
        reply = await reply.save();

        return resp.send(reply);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get(`/reply/:questionId`, async (req, resp) => {
        try{
            let replies = await Reply.find({questionId: req.params.questionId}).sort({creation_date: 1});
            return resp.send(replies);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}