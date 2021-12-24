const face_api = require('face-api.js');

const canvas = require('canvas');
const { Canvas, Image, ImageData } = canvas;
face_api.env.monkeyPatch( { Canvas, Image, ImageData } );

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
        }), {lineWidth: 10});
        drawBox.draw(out);
    });
    face_api.draw.drawFaceExpressions(out, results, 0.1);
    
    image_utils.save_file(dir, name, out.toBuffer('image/jpeg'));
};

exports.predict_emotion = async (from,image) => {
    const path_to_image = image_utils.path_to_image(from,image);
    const img = await canvas.loadImage(path_to_image);
    const results = await face_api.detectAllFaces(img, face_detection_options)
                                  .withFaceLandmarks()
                                  .withFaceExpressions();
    
    if (results.length === 0){
        throw new Error('Failed to detect faces');
    }
    
    var expressions = [];
    results.forEach((res) => {
        var e = {};
        Object.entries(res.expressions).forEach(([emotion,percentage]) => {
            e[emotion] = percentage;
        });
        expressions.push(e);
    });
    
    draw('detected', img, results, image);
    return expressions;
};

