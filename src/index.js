require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

const SERVER_PORT = Number(process.env.SERVER_PORT || 8080)
let host = `localhost:${SERVER_PORT}`;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

mongoose.connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(
    () => {
        console.log("Success connect to: tradeMapDataBase", host);
    },
    err => {
        console.log("Error connect to: tradeMapDatabase" + err);
    }
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan("dev"));

app.use(express.json());

app.get('/', async(req, res) => {
    res.redirect('/api-docs')
})

require('./app/controller/index')(app);

app.listen(process.env.PORT || 8080);