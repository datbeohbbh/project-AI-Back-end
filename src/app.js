const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const path = require('path');

upload_router = require('./routes/upload_router');
emotion_recognition_router = require('./routes/emotion_recognition_router');
image_router = require('./routes/image_route');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'/assets/public')));
app.use('/uploaded',express.static(path.join(__dirname,'/routes/uploads')));
app.use('/detected',express.static(path.join(__dirname,'/routes/detected')));

app.get('/',(request,response) => {
    response.redirect('index.html');
});

app.use('/uploads',upload_router);
app.use('/emotions',emotion_recognition_router);
app.use('/images',image_router);

app.listen(config.port,config.host,() => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
});
