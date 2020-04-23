let auth = require('../auth.js');

module.exports = (app, mongoose) => {
    let Course = require('../models/courseModel.js');
    let Badge = require('../models/badgeModel.js');

    app.post(`/editCourse:courseId`, auth, async(req, resp) => {
    try{
        let {name, description, imageUrl, user} = req.body;
        if(!user || !user._id)return resp.send({err: 'You need to be logged in to create new courses'});
        if(name && name.length > 40)return resp.send({err: 'Course name cannot be longer than 40 symbols'});
        if(description && description.length > 1024)return resp.send({err: 'Course description cannot be longer than 1024 symbols'});

        let course = await Course.findOne({_id: req.params.courseId});
        course.name = name;
        course.desc = description;
        course.imageUrl = imageUrl;

        if(!course.completionBadge)
        {
            let b = new Badge({name : course.name + " completion badge!",
            desc : "Congratulations for finishing the course!",
            courseId: req.params.courseId,
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'});
            b = await b.save();
            course.completionBadge = b._id;
        }

        course = await course.save();
        return resp.send(course.toObject());

    }catch(e){console.log(e);return resp.status(500).end();}
    });

    app.post('/createCourse', auth, async(req, resp) => {
        try{
        let {name, description, imgUrl, user} = req.body;
        if(!user || !user._id)return resp.send({err: 'You need to be logged in to create new courses'});
        if(name && name.length > 40)return resp.send({err: 'Course name cannot be longer than 40 symbols'});
        if(description && description.length > 1024)return resp.send({err: 'Course description cannot be longer than 1024 symbols'});

        let doc = await Course.findOne({name: name});
        if(doc)return resp.send({err: "course with such name already exists"});

        let b = new Badge({name : name + " completion badge!",
        desc : "Congratulations for finishing the course!",
        courseId: req.params.courseId,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'});
        b = await b.save();

        let course = new Course({
            name : name,
            desc : description,
            creator: mongoose.Types.ObjectId(user._id),
            completionBadge: b._id,
            imageUrl: imgUrl,
            students: 0,
            ratingsCount: 0,
            rating: 0
        });

            course = await course.save();

            return resp.send(course);

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}