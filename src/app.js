express = require('express');
morgan = require('morgan');
bodyParser = require('body-parser');
config = require('./config');

upload_router = require('./main-process/upload_router');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/assets/public'));

app.get('/',(request,response) => {
    response.redirect('index.html');
});

app.use('/uploads',upload_router);

app.listen(config.port,config.host,() => {
    console.log(`Server running at http://${config.host}:${config.port}/`);
});
