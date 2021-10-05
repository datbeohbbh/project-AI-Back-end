const express = require('express');
const multer = require('multer');

const upload_router = express.Router();

const MAGIC = 1211;
const BASE = 1000000007;

hash_code = (str) => {
    let hash_ret = 1;
    for(let i = 0;i < str.length;++i){
        hash_ret = (hash_ret * MAGIC + str.charCodeAt(i)) % BASE;
    }
    return hash_ret;
};

const storage = multer.diskStorage({
    destination : (request,file,callback) => {
        callback(null,__dirname + '/uploads');
    },
    filename : (request,file,callback) => {
        const unique_suffix = Date.now() + '-' + hash_code(file.fieldname + '-' + Date.now());
        callback(null,file.fieldname + '-' + unique_suffix);
    }
});

const upload = multer({
    storage : storage
});

upload_router.post('/',upload.single('image'),(request,response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type','application/json'); 
    response.json({
        status : "OK",
        message : "Upload successfully!!",
        photo_name : request.file.filename
    });
});

module.exports = upload_router;
