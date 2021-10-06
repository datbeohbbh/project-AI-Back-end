const cv = require('opencv4nodejs');
const fs = require('fs/promises');
const path = require('path');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2); 

const get_faces = async (gray_img) => {
    const face_classifier = await classifier.detectMultiScaleAsync(gray_img); // return rect class
    const face_rects = face_classifier.objects; // return rect class
    if(face_rects.length === 0){
        throw new Error('Failed to detect faces');
    }
    return face_rects.map(current => gray_img.getRegion(current)); // getRegion return Mat 
};

exports.get_all_faces = async (image) => {
    try{
        const path_to_image = path.resolve(__dirname,'../uploads/' + image);
        const img = await cv.imreadAsync(path_to_image);
        const gray_img = await img.bgrToGrayAsync();
        const list_of_faces = await get_faces(gray_img);
        return list_of_faces;
    } catch(err){
        throw err;
    }
};
