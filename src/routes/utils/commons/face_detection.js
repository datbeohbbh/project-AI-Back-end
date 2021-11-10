const face_api = require('face-api.js');

const face_detection_net = face_api.nets.ssdMobilenetv1;
exports.face_detection_net = face_detection_net;

// SsdMobilenetv1
const minConfidence = 0.4;

// TinyFaceDetectorOptions
const inputSize = 408;

const scoreThreshold = 0.5;

const get_face_detector_options = (net) => {
    return net === face_api.nets.ssdMobilenetv1
    ? new face_api.SsdMobilenetv1Options( { minConfidence })
    : new face_api.TinyFaceDetectorOptions( {inputSize, scoreThreshold});
};

exports.face_detection_options = get_face_detector_options(face_detection_net);
