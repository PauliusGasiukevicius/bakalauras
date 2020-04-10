let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
let fs = require('fs').promises;
let auth = require('./auth.js');
let FormData = require('form-data');
let fetch = require('node-fetch');

module.exports = (app, mongoose) => {

    let File = require(`./models/fileModel.js`);

    let cleanUpUnusedFiles = async() => {
        try{
            await File.deleteMany({courseId: {$exists: false}});
        setTimeout(cleanUpUnusedFiles, 1000 * 60 * 60);
        }catch(err){console.log(err)};
    }
    cleanUpUnusedFiles();

    app.delete(`file/:fileId`, auth, async (req,resp) => {
        try{
            await File.deleteOne({_id: req.params.fileId});
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
        });

    app.get(`/file/:fileId`, async (req,resp) => {
        try{
        let file = await File.findOne({_id: req.params.fileId});
        if(!file)return resp.status(404).send({err: 'file does not exist'});

        await fs.writeFile(`/${file.name}`, Buffer.from(file.data, 'binary'), 'binary'); //loads from DB to RAM
        return resp.download(`/${file.name}`,`${file.name}`); //sends the file

        /*
        resp.writeHead(200, {
            'Content-Type': file.contentType,
            'Content-disposition': 'attachment;filename=' + file.name,
            'Content-Length': file.data.length
        });
        return resp.end(Buffer.from(file.data, 'binary'));*/

    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post(`/file`, upload.single('file'), auth, async (req, resp) => {
        try{
        let file = new File();
        file.name = req.file.originalname;
        file.data = await fs.readFile(req.file.path);
        file.contentType = req.file.mimetype;
        file = await file.save();
        await fs.unlink(req.file.path);

        return resp.send({location: `/file/${file._id}`});
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post('/image', upload.single('image'), auth, async (req, resp) => {
        try{

        let apiUrl = 'https://api.imgur.com/3/image';
        let apiKey = process.env.IMGUR_API_KEY; 

        let formData = new FormData();
        formData.append("image", await fs.readFile(req.file.path));

        let res = await fetch(apiUrl, {method: "POST", mode: "cors", headers:
       {Authorization: 'Client-ID ' + apiKey, Accept: 'application/json'}, body: formData});
        let json = await res.json();
        await fs.unlink(req.file.path);

        return resp.send({url: json.data.link});

    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}