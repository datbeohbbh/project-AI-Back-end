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
            try{
                const faces = await face_utils.get_all_faces(request.params.image);
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
                
                response.status(200).json({
                    status : 'OK',
                    emotions_from_image : emotions_dict
                });
            } catch(err){
                next(err);
            }
        } else {
            response.status(404).json({
                status : `Not found an image with name: ${request.params.image}`
            });
        }
    }
};

emotion_recognition_router.get('/:image',method.GET);

module.exports = emotion_recognition_router;
