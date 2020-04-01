module.exports = (app, mongoose) => {

    let Question = require(`../models/questionModel.js`);
    let Reply = require(`../models/replyModel.js`);
    require('./replies.js')(app, mongoose);

    app.delete(`/question/:questionId`, async (req, resp) => {
        try{
            await Question.deleteOne({_id: req.params.questionId});
            await Reply.delete({questionId: req.params.questionId});
        return resp.send({ok: 'success'});  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post(`/question/:courseId`, async (req, resp) => {
        try{
        let {title, content} = req.body;
        let time = new Date();            
        let question = new Question({courseId: req.params.courseId, userId: req.body.user._id, userName: req.body.user.name, title: title, content: content, creation_date: time, edit_date: time, upvotes: 0, replies: 0});
        question = await question.save();

        return resp.send(question);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.put(`/question/:questionId`, async (req, resp) => {
        try{
        let question = await Question.findOne({_id: req.params.questionId});
        let {title, content} = req.body;
        question.title = title;
        question.content = content;
        question.edit_date = new Date();  
        question = await question.save();

        return resp.send(question);  
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get(`/question/:courseId`, async (req, resp) => {
        try{
            let questions = await Question.find({courseId: req.params.courseId}).sort({creation_date: 1});
            return resp.send(questions);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}