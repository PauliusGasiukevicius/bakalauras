let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
var fs = require('fs').promises;

module.exports = (app, mongoose) => {

    let File = require(`./models/fileModel.js`);

    app.delete(`file/:fileId`, async (req,resp) => {
        try{
            await File.deleteOne({_id: req.params.fileId});
            return resp.send({ok: 'success'});
        }catch (error) {console.log(error);return resp.status(400).send({err: error});}
        });

    app.get(`/file/:fileId`, async (req,resp) => {
        try{
        let file = await File.findOne({_id: req.params.fileId});
        if(!file)return resp.status(404).send({err: 'file does not exist'});

        resp.writeHead(200, {
            'Content-Type': file.contentType,
            'Content-disposition': 'attachment;filename=' + file.name,
            'Content-Length': file.data.length
        });
        return resp.end(Buffer.from(file.data, 'binary'));

    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });

    app.post(`/file`, upload.single('file'), async (req, resp) => {
        try{
        let file = new File();
        file.name = req.file.originalname;
        file.data = await fs.readFile(req.file.path);
        file.contentType = req.file.mimetype;
        file = await file.save();

        return resp.send({location: `/file/${file._id}`});
    }catch (error) {console.log(error);return resp.status(400).send({err: error});}
    });
}