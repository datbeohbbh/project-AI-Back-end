const faceapi = require('face-api.js');
const canvas = require('canvas');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, './out')

function saveFile(fileName, buf) {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }

  fs.writeFileSync(path.resolve(baseDir, fileName), buf)
}

const model_path = path.resolve(__dirname,'../../assets/model/weights');

const faceDetectionNet = faceapi.nets.ssdMobilenetv1;

const minConfidence = 0.5;

const inputSize = 408;

const scoreThreshold = 0.5;

function getFaceDetectorOptions(net) {
    /*
  console.log(net);
  console.log(faceDetectionNet);
console.log("OK");
*/
  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

const run = async (test) => {
  await faceDetectionNet.loadFromDisk(model_path);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(model_path);
  await faceapi.nets.faceExpressionNet.loadFromDisk(model_path);

  const img = await canvas.loadImage(`./images/${test}`);
  const results = await faceapi.detectAllFaces(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceExpressions()

  const out = faceapi.createCanvasFromMedia(img);
  faceapi.draw.drawDetections(out, results.map(res => res.detection))
  faceapi.draw.drawFaceExpressions(out, results)

  saveFile('faceExpressionRecognition.jpg', out.toBuffer('image/jpeg'))
  console.log('done, saved results to out/faceExpressionRecognition.jpg')
}

//const test = 'image-1633531530752-350309716.jpg';
//const test = 'surprised.jpg';
const test = 'image-1633793470679-665045798.jpg';
run(test);

