/*
const config = require('../../config');
const tf = require('@tensorflow/tfjs-node');
const tfCore = require('@tensorflow/tfjs-core');
const path = require('path');

const model_path = path.resolve(__dirname,'../../assets/model/model.json');

const emotion = ['angry', 'disgust', 'fear', 'happy', 'sad','surprise', 'neutral'];

const precise = (value) => {
    return value.toPrecision(5);
};

var tfmodel = null;
(async () => {
    try{
        tfmodel = await tf.loadLayersModel('file://' + model_path);
    } catch(e){
        throw e;
    }
})();

exports.predict_emotion = async (image) => {
    let flat_image = [];
    for(let channel = 0;channel < config.CHANNELS;++channel){
        for(let h = 0;h < config.IMG_HEIGHT;++h){
            for(let w = 0;w < config.IMG_WIDTH;++w){
                flat_image[channel * 48 * 48 + h * 48 + w] = image[h][w] / 255;
            }
        }
    }

    let input = tfCore.tensor(flat_image,[1,config.IMG_HEIGHT,config.IMG_WIDTH,config.CHANNELS],'float32');
    let predict_result = tfmodel.predict(input);
    let emotion_percentage = await predict_result.array();
    console.log(emotion_percentage);
    let emotion_ret = {};

    emotion_percentage[0].forEach((cur_value,index) => {
        emotion_ret[emotion[index]] = Number.parseFloat(precise(cur_value * 100));
    });
    return emotion_ret;
};
*/

// ======================================================================================= //

const tfjs = require('@tensorflow/tfjs-node');
const tfcore = require('@tensorflow/tfjs-core');

const face_api = require('face-api.js');

const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
face_api.env.monkeyPatch( { Canvas, Image, ImageData } );

const fs = require('fs');
const path = require('path');

const { face_detection_net,face_detection_options } = require('./commons/face_detection');

const model_path = path.resolve(__dirname,'../../assets/model/weights');

const image_utils = require('./image_utils');
const {Box} = require("face-api.js");

(async () => {
    try{
        console.log('Loading model ...');
        await face_detection_net.loadFromDisk(model_path);
        await face_api.nets.faceLandmark68Net.loadFromDisk(model_path);
        await face_api.nets.faceExpressionNet.loadFromDisk(model_path);
        console.log('Load complete!!');
    } catch(e){
        throw e;
    }
})();

const draw = (dir,image,results,name) => {
    const out = face_api.createCanvasFromMedia(image);

    results.map(res => {
        const drawBox = new face_api.draw.DrawBox(new Box({
            x: res.detection.box.x,
            y: res.detection.box.y,
            width: res.detection.box.width,
            height: res.detection.box.height
        }), {lineWidth: 50});
        drawBox.draw(out);
    });
    face_api.draw.drawFaceExpressions(out,results);
    
    image_utils.save_file(dir,name,out.toBuffer('image/jpeg'));
};

exports.predict_emotion = async (from,image) => {
    const path_to_image = image_utils.path_to_image(from,image);
    const img = await canvas.loadImage(path_to_image);
    const results = await face_api.detectAllFaces(img, face_detection_options)
                                  .withFaceLandmarks()
                                  .withFaceExpressions();
    
    if(results.length === 0){
        throw new Error('Failed to detect faces');
    }
    
    console.log(results.length);
    
    var expressions = [];
    results.forEach((res) => {
        var e = {};
        Object.entries(res.expressions).forEach(([emotion,percentage]) => {
            e[emotion] = percentage;
        });
        expressions.push(e);
    });
    
    draw('detected',img,results,image);
    
    return expressions;
};

