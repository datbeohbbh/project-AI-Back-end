const face_api = require('face-api.js');

const default_face_detection_net = face_api.nets.ssdMobilenetv1;

exports.face_detection_net = default_face_detection_net;

// SsdMobilenetv1
const min_confidence = 0.4;

// TinyFaceDetectorOptions
const input_size = 408;
const score_threshold = 0.5;

const get_face_detector_options = (net) => {
    return net === face_api.nets.ssdMobilenetv1 
    ? new face_api.SsdMobilenetv1Options( { min_confidence })
    : new face_api.TinyFaceDetectorOptions( {input_size, score_threshold });
};

exports.face_detection_options = get_face_detector_options(default_face_detection_net);
