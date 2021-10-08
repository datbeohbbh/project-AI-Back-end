const express = require('express');
const image_utils = require('./utils/image_utils');

const image_route = express.Router();

const build_html = (image_name) => {
    var str = '';
    for(let i = 0;i < image_name.length;++i){
        str += `<h3> ${image_name[i]} </h3> \n <img src = "/uploaded/${image_name[i]}" \n <br> <br>`;
    }
    var html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title> show image </title>
            </head>
            <body>
                ${str}
            </body>
        </html>
    `;
    return html;
};

image_route.get('/all',(request,response) => {
    const image_list = image_utils.get_image_list();
    response.setHeader('Content-Type','text/html');
    const html = build_html(image_list);
    response.send(html);
});

image_route.get('/:image',(request,response) => {
    const image_name = request.params.image;
    if(image_utils.contains(image_name) === true){
        response.setHeader('Content-Type','text/html');
        const html = build_html([image_name]);
        response.send(html);
    } else {
        response.setHeader('Content-Type','application/json');
        response.status(404).json({
            status : 'Fail',
            message : `Not found ${image_name}`
        });
    }
});

module.exports = image_route;
