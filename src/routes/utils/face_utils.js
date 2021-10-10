const cv = require('opencv4nodejs');
const fs = require('fs/promises');
const path = require('path');
const image_utils = require('./image_utils');

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2); 
const num_detections_th = 10;

const read_image = async (from,image) => {
    const path_to_image = image_utils.path_to_image(from,image);
    const img = await cv.imreadAsync(path_to_image);

    return img;
};

const do_classifier = async (image) => {
    const img = await read_image('uploads',image);
    const gray_img = await img.bgrToGrayAsync();
    const face_classifier = await classifier.detectMultiScaleAsync(gray_img); 

    return face_classifier;
};

const get_faces = async (face_classifier,image) => {
    const face_rects = face_classifier.objects; // return rect class

    if(face_rects.length === 0){
        throw new Error('Failed to detect faces');
    }

    const img = await read_image('uploads',image);
    const gray_img = await img.bgrToGrayAsync();

    return face_rects.map(current => gray_img.getRegion(current)); // getRegion return Mat 
};

const draw_rect = (img,rect,color,thickness) => {
    img.drawRectangle(rect,color,thickness,cv.LINE_8);
};

const draw_blue_rect = (img,rect,thickness) => {
    draw_rect(img,rect,new cv.Vec3(255,0,0),thickness);
};

const write_text = (img,rect,index,content) => {
    img.putText(index + ' - ' + content,new cv.Point2(rect.x,rect.y + rect.height + 30),2,1,new cv.Vec3(30,212,0));
};

const draw_rectangle_on_detected_face = async (face_classifier,image,content) => {
    const { objects, numDetections } = face_classifier;
    const img = await read_image('uploads',image);

    objects.forEach((rect,index) => {
        const thickness = numDetections[index] < num_detections_th ? 1 : 2;

        draw_blue_rect(img,rect,thickness);
        write_text(img,rect,index,content[index]);
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
