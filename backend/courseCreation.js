const Joi = require('@hapi/joi');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const courseValidationSchema = Joi.object({});
//^^use this https://hapi.dev/family/joi/

module.exports = (app, mongoose) => {

    let courseSchema = new mongoose.Schema({
        name : String,
        desc : String,
        creator: mongoose.ObjectId,
        imageUrl: [String]
        });
    let Course = mongoose.model('course', courseSchema);

    app.post('/createCourse', upload.fields(
        [{name: 'image', maxCount: 1}, {name: 'name', maxCount: 1}, {name: 'description', maxCount: 1}]),
        (req, resp) => {
        console.log(req.body, req.file, req.files);
        
        resp.send({err: 'hmm'});
        /*Next:
         1) upload images to imgur and get link back
         2) add user _id to POST so we can track creator
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