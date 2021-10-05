const cv = require('opencv4nodejs');
const fs = require('fs/promises');
const path = require('path');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2); 

const get_faces = (gray_img) => {
    const face_rects = classifier.detectMultiScale(gray_img).objects; // return rect class
    if(!face_rects.length){
        throw new Error('Failed to detect faces');
    }
    return face_rects.map(current => gray_img.getRegion(current)); // getRegion return Mat 
};

exports.get_all_faces = function(image){
    const path_to_image = path.resolve(__dirname,'../uploads/' + image);
    const img = cv.imread(path_to_image);
    const gray_img = img.bgrToGray();
    const list_of_faces = get_faces(gray_img);
    return list_of_faces;
};
