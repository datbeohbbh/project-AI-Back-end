const face_api = require('face-api.js');

const canvas = require('canvas');

const { Canvas, Image, ImageData } = canvas;

face_api.env.monkeyPatch( { Canvas, Image, ImageData } );

exports.canvas = canvas;
