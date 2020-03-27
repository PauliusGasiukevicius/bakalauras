module.exports = (app, mongoose) => {
    let Course = require('../models/courseModel.js');

    app.post(`/editCourse:courseId`, async(req, resp) => {
    try{
        let {name, description, imageUrl, user} = req.body;
        if(!user || !user._id)return resp.send({err: 'You need to be logged in to create new courses'});
        if(name && name.length > 40)return resp.send({err: 'Course name cannot be longer than 40 symbols'});
        if(description && description.length > 1024)return resp.send({err: 'Course description cannot be longer than 1024 symbols'});

        let course = await Course.findOne({_id: req.params.courseId});
        course.name = name;
        course.desc = description;
        course.imageUrl = imageUrl;
        course = await course.save();
        return resp.send(course.toObject());

    }catch(e){console.log(e);return resp.status(500).end();}
    });

    app.post('/createCourse', (req, resp) => {
        //console.log(req.body);
        let {name, description, imgUrl, user} = req.body;
        if(!user || !user._id)return resp.send({err: 'You need to be logged in to create new courses'});
        if(name && name.length > 40)return resp.send({err: 'Course name cannot be longer than 40 symbols'});
        if(description && description.length > 1024)return resp.send({err: 'Course description cannot be longer than 1024 symbols'});

        Course.find({name: name}, (err, doc) => {
            if(err)return resp.send({err: "DB ERROR"});
            if(doc.length > 0)return resp.send({err: "course with such name already exists"});

            let course = new Course({
                name : name,
                desc : description,
                creator: mongoose.Types.ObjectId(user._id),
                imageUrl: imgUrl,
                students: 0,
                ratingsCount: 0,
                rating: 0
            });

            course.save((err,res) => {
                if(err)return resp.send({err: "DB ERROR"});
                return resp.send(res);
            });
        });
    });
}