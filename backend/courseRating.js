let auth = require('./auth.js');

module.exports = (app, mongoose) => {

    let Rating = require(`./models/courseRatingModel.js`);
    let Course = require('./models/courseModel.js');

    app.get(`/rating/:courseId/:userId`, async (req,resp) => {
        try{
            let rating = await Rating.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(!rating)return resp.send({err: 'no rating'});
            return resp.send(rating);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    })

    app.post(`/rating/:courseId`, auth, async (req,resp) => {
        try{
        let {user, value} = req.body;
        if(value < 0 || value > 5)return resp.send({err: 'invalid rating'});
        
        let rating = await Rating.findOne({userId: user._id, courseId: req.params.courseId});
        let isNewRating = false;
        if(!rating){
            rating = new Rating({userId: user._id, courseId: req.params.courseId, value: 0});
            isNewRating = true;
        }
        await Course.updateOne({_id: req.params.courseId}, {$inc: {ratingsCount: Number(isNewRating), rating: value - rating.value}});
        rating.value = value;
        rating = await rating.save();
        return resp.send(rating);

    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}