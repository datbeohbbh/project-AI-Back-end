const cv = require('opencv4nodejs');
const fs = require('fs/promises');
const path = require('path');
const image_utils = require('./image_utils');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2); 
const num_detections_th = 10;

const do_classifier = async (image) => {
    const path_to_image = image_utils.path_to_image('uploads',image);
    const img = await cv.imreadAsync(path_to_image);
    const gray_img = await img.bgrToGrayAsync();
    const face_classifier = await classifier.detectMultiScaleAsync(gray_img); 
    return face_classifier;
};

const get_faces = async (face_classifier,image) => {
    const face_rects = face_classifier.objects; // return rect class
    if(face_rects.length === 0){
        throw new Error('Failed to detect faces');
    }
    const path_to_image = image_utils.path_to_image('uploads',image);
    const img = await cv.imreadAsync(path_to_image);
    const gray_img = await img.bgrToGrayAsync();
    return face_rects.map(current => gray_img.getRegion(current)); // getRegion return Mat 
};

const draw_rect = (img,rect,color,thickness) => {
    img.drawRectangle(rect,color,thickness,cv.LINE_8);
};

const draw_blue_rect = (img,rect,thickness) => {
    draw_rect(img,rect,new cv.Vec3(255,0,0),thickness);
};

const write_text = (img,rect,content) => {
    img.putText(content,new cv.Point2(rect.x + rect.width / 4,rect.y + rect.height + 20),2,1.2,new cv.Vec3(30,212,0));
};

const draw_rectangle_on_detected_face = async (face_classifier,image,content) => {
    const { objects, numDetections } = face_classifier;

    const path_to_image = image_utils.path_to_image('uploads',image);
    const img = await cv.imreadAsync(path_to_image);

    objects.forEach((rect,index) => {
        const thickness = numDetections[index] < num_detections_th ? 1 : 2;
        draw_blue_rect(img,rect,thickness);
        write_text(img,rect,content[index]);
    });
    cv.imwrite(image_utils.path_to_image('detected','') + image,img);
};

exports.get_all_faces = async (image) => {
    try{
        const face_classifier = await do_classifier(image);
        const list_of_faces = await get_faces(face_classifier,image);
        return list_of_faces;
    } catch(err){
        throw err;
    }
};

exports.draw_detected_faces = async (image,content) => {
    try{
        const face_classifier = await do_classifier(image);
        await draw_rectangle_on_detected_face(face_classifier,image,content);
    } catch(err){
        throw err;
    }
};
