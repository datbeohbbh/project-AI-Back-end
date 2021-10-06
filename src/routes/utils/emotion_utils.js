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
    let input = tfCore.tensor(flat_image,[1,config.IMG_HEIGHT,config.IMG_WIDTH,config.CHANNELS]);
    let predict_result = tfmodel.predict(input);
    let emotion_percentage = await predict_result.array();
    let emotion_ret = {};
    for(let i = 0;i < emotion.length;++i){
        emotion_ret[emotion[i]] = Number.parseFloat(precise(emotion_percentage[0][i] * 100));
    }
    return emotion_ret;
};
