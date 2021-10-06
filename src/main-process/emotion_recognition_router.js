const express = require('express');
const image_utils = require('./utils/image_utils');
const face_utils = require('./utils/face_utils');
const emotion_utils = require('./utils/emotion_utils');
const config = require('../config');

const emotion_recognition_router = express.Router();

method = {
    GET : async (request,response,next) => {
        response.setHeader('Content-Type','application/json'); 
        if(image_utils.contains(request.params.image) === true){
            const faces = face_utils.get_all_faces(request.params.image);
            const faces_dict = {};
            for(let i = 0;i < faces.length;++i){
                face = faces[i].resize(config.IMG_HEIGHT,config.IMG_WIDTH).getDataAsArray();
                faces_dict[i] = {
                    pixel_gray_scale_image : face
                };
            }
            
            const emotions_dict = {};
            for(let i = 0;i < faces.length;++i){
                let pixel = faces_dict[i].pixel_gray_scale_image; /// [][]
                let emotion_predict = await emotion_utils.predict_emotion(pixel);
                emotions_dict[i] = {
                    emotion : emotion_predict
                };
            }
            
            response.statusCode = 200;
            response.json({
                status : 'OK',
                emotions_from_image : emotions_dict
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
