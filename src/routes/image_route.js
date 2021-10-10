const express = require('express');
const image_utils = require('./utils/image_utils');

const image_route = express.Router();

const build_html = (from,image_name) => {
    var str = '';
    for(let i = 0;i < image_name.length;++i){
        str += `<h3> ${image_name[i]} </h3> \n <img src = "/${from}/${image_name[i]}" \n <br> <br>`;
    }
    var html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title> show image from ${from} </title>
            </head>
            <body>
                ${str}
            </body>
        </html>
    `;
    return html;
};

image_route.get('/all/uploaded',(request,response) => {
        const image_list = image_utils.get_image_list('uploads');
        response.setHeader('Content-Type','text/html');
        const html = build_html('uploaded',image_list);
        response.send(html);
    });

image_route.get('/uploaded/:image',(request,response) => {
        const image_name = request.params.image;
        if(image_utils.contains('uploads',image_name) === true){
            response.setHeader('Content-Type','text/html');
            const html = build_html('uploaded',[image_name]);
            response.send(html);
        } else {
            response.setHeader('Content-Type','application/json');
            response.status(404).json({
                msg : `Not found ${image_name}`
            });
        }
    });

image_route.get('/all/detected',(request,response) => {
        const image_list = image_utils.get_image_list('detected');
        response.setHeader('Content-Type','text/html');
        const html = build_html('detected',image_list);
        response.send(html);
    });

image_route.get('/detected/:image',(request,response) => {
        const image_name = request.params.image;
        if(image_utils.contains('detected',image_name) === true){
            response.setHeader('Content-Type','text/html');
            const html = build_html('detected',[image_name]);
            response.send(html);
        } else {
            response.setHeader('Content-Type','application/json');
            response.status(404).json({
                msg : `Not found ${image_name}`
            });
        }
    });

module.exports = image_route;
