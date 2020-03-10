module.exports = (app, mongoose) => {

    let courseSchema = new mongoose.Schema({
        name : String,
        desc : String,
        creator: mongoose.ObjectId,
        imageUrl: String,
        students: Number,
        ratingsCount: Number,
        rating: Number
        });

    let Course = mongoose.model('course', courseSchema);

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

    app.get('/courses/user/teach/:id', (req,resp) => {
        Course.find({creator: req.params.id}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });

    app.get('/courses', (req,resp) => {
        Course.find({}, (err,docs) => {
            if(err)return resp.send({err: "DB ERROR"});
            return resp.send(docs);
        });
    });
}