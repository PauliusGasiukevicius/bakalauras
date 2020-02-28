const Joi = require('@hapi/joi');

const courseValidationSchema = Joi.object({});
//^^use this https://hapi.dev/family/joi/

module.exports = (app, mongoose) => {

    let courseSchema = new mongoose.Schema({
        name : String,
        desc : String,
        creator: mongoose.ObjectId,
        imageUrl: [String],
        students: Number,
        rating: Number
        });
    let Course = mongoose.model('course', courseSchema);

    app.post('/createCourse', (req, resp) => {
        console.log(req.body);
        let {name, description, imgURL, user} = req.body;
        console.log(name,description,imgURL, user);

        resp.send({err: 'hmm'});
        /*Next:
         1) upload images to imgur and get link back [done]
         2) add user _id to POST so we can track creator [done]
         3) Write JOI validations so that text is not > 1KB
         4) save all that to DB
         5) add get API for courses :user teaches
         opt) add API for get courses from :filters and range of [x,y] (and load more button on start)
        */
        /*let course = new Course({ });
        course.save((err,res) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(res);
        });*/
    });

    app.get('/courses', (req,resp) => {
        Course.find({}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });
}