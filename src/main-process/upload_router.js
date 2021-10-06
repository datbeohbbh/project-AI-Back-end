const express = require('express');
const multer = require('multer');
const image_utils = require('./utils/image_utils.js');

const upload_router = express.Router();


const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null,__dirname + '/uploads');
    },
    filename : (request,file,callback) => {
        const unique_suffix = Date.now() + '-' + image_utils.hash_code(file.originalname + '-' + Date.now());
        const extension = image_utils.get_extension(file.originalname);
        if(extension === null || image_utils.validate_extension(extension) === false){
            callback(new Error('Upload ' + file.originalname + ' fail'));
        } else {
            callback(null,file.fieldname + '-' + unique_suffix + '.' + extension);
        }
    }
});

const upload = multer({
    storage : storage
});

upload_router.post('/',upload.single('image'),(request,response) => {
    response.setHeader('Content-Type','application/json'); 
    response.status(200).json({
        status : "OK",
        message : "Upload successfully!!",
        image_name : request.file.filename
    });
});

module.exports = upload_router;
