const express = require('express');
const image_utils = require('./utils/image_utils');
const face_utils = require('./utils/face_utils');

const emotion_recognition_router = express.Router();

method = {
    GET : (request,response,next) => {
        response.setHeader('Content-Type','application/json'); 
        if(image_utils.contains(request.params.image) === true){
            const faces = face_utils.get_all_faces(request.params.image);
            //console.log(faces.length);
            //console.log(faces);
            const faces_dict = {};
            for(let i = 0;i < faces.length;++i){
                face = faces[i].resize(48,48).getDataAsArray();
                faces_dict[i] = {
                    pixel_gray_scale_image : face
                };
            }
            response.statusCode = 200;
            response.json({
                status : 'OK',
                faces : faces_dict
            });
        } else {
            response.statusCode = 404;
            response.json({
                status : `Not found an image with ${req.params.image}`
            });
        }
    }
};

emotion_recognition_router.get('/:image',method.GET);

module.exports = emotion_recognition_router;
