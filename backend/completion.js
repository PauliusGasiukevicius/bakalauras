let auth = require('./auth.js');
let CourseUserProgress = require('./models/courseUserProgressModel.js');
let CourseContent = require('./models/courseContentModel.js');
let Completion = require('./models/Completion.js');
let Course = require('./models/courseModel.js');
let Badge = require('./models/badgeModel.js');
let Certificate = require('./models/certificateModel.js');
let User = require('./models/userModel.js');

module.exports = (app, mongoose) => {

    app.get('/certificate/:userId/:courseId', async (req,resp) => {
        try{
            let certificate = await Certificate.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(certificate)return resp.send(certificate.message);

            let completion = await Completion.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(!completion)return resp.send({err: "user haven't completed the course yet"});
            let course = await Course.findOne({_id: req.params.courseId});
            let user = await User.findOne({_id: req.params.userId});

            certificate = new Certificate({
                message : `
                <style>

                html{
                    width: 100%;
                    height: 100%;
                    background-color: #282c34;
                }

                #title {
                margin-top: 3em;
                }

                body{
                width: 800px;
                height: 600px;
                border: 5px solid white;
                margin: auto;
                text-align: center;
                background: #eee url("https://i.imgur.com/bYve5gf.png") no-repeat; background-size: 100%;
                }

                h1 {
                margin-top: 1em;
                font-family: sans-serif;
                width: 100%;
                }

                p {
                font-family: 'Arial', sans-serif;
                font-size: 1.2em;
                margin: 5px 0;
                }

                #user {
                font-size: 50px;
                color: #282c34;
                }

                #date {
                margin-top: 6em;
                }

                #verify {
                opacity: 1;
                font-size: 12px;
                color: grey;
                margin-top: 1em;
                }

                </style>

                <body>
                    <div id="certificate">
                        <h1 id="itle">
                        Certificate of Completion
                        </h1>

                        <p>
                            THIS IS TO CERTIFY THAT
                        </p>

                        <h1 id="user">
                        ${user.name}
                        </h1>

                        <p>
                        has successfully completed the
                        </p>

                        <h2 id="course">
                        ${course.name}
                        </h2>

                        <p>
                        &nbsp; from ${req.get('host')}
                        </p>

                        <br>
                        <p id="date">
                        <b>Issued on:</b> ${(new Date(completion.date)).toLocaleDateString()}
                        </p>

                        <div id="verify">
                            Verify at ${req.get('Host')+`/certificate/${user._id}/${course._id}`}
                        </div>
                    </div>

                </body>
                `,
                courseId: course._id,
                userId: user._id,});
            
            certificate = await certificate.save();

            return resp.send(certificate.message);

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get('/complete/:courseId/:userId', async (req,resp) => {
        try{
            let comp = await Completion.findOne({userId: req.params.userId, courseId: req.params.courseId});
            if(comp != null)return resp.send(comp);
            return resp.send({err: 'User did not finish the course'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get('/badge/:badgeId', async (req,resp) => {
        try{
            if(!req.params.badgeId)return resp.send({err: 'course does not have a completion badge'});
            let b = await Badge.findOne({_id: req.params.badgeId});
            return resp.send(b);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/editBadge/:badgeId', async (req,resp) => {
        try{
            let b = await Badge.findOne({_id: req.params.badgeId});
            let {name, desc, imageUrl} = req.body;
            if(name.length > 40)return resp.send({err: "badge name can only be <= 40 characters long"});
            if(desc.length > 40)return resp.send({err: "badge description can only be <= 40 characters long"});
            b.name = name;
            b.desc = desc;
            b.imageUrl = imageUrl;
            b = await b.save();
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.get('/badgesOfUser/:userId', async (req,resp) => {
        try{
            let user = await User.findOne({_id: req.params.userId});
            let b = await Badge.find({_id: {$in: user.badges}});
            return resp.send(b);
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/complete/:courseId', auth, async (req,resp) => {
        try{
            let user = req.body.user;

            let comp = await Completion.findOne({userId: user._id, courseId: req.params.courseId});
            if(comp != null)return resp.send({ok: 'succes'});
            
            let progress = await CourseUserProgress.findOne({userId: user._id, courseId: req.params.courseId});
            let content = await CourseContent.findOne({courseId: req.params.courseId});

            progress = new Set(progress.sections.map(x => ""+x));
            content = new Set(content.sections.map(x=> ""+x));

            for(let section of content)
            if(!progress.has(section))return resp.send({err: 'User did not finish the course'});

            let course = await Course.findOne({_id: req.params.courseId});
            if(!course.completionBadge)
            {
                let b = new Badge({name : course.name + " completion badge!",
                desc : "Congratulations for finishing the course!",
                courseId: req.params.courseId,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'});
                b = await b.save();

                course.completionBadge = b._id;
                course = await course.save();
            }

            await User.updateOne({_id: user._id}, {$push: {badges: course.completionBadge}});

            comp = new Completion({courseId: req.params.courseId, userId: user._id, date: new Date()});
            await comp.save();
            return resp.send({ok: 'succes'});

        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}