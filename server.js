const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const devKeys = require('./config/dev');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const { PORT, mongoURI } = devKeys;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

mongoose.connect(mongoURI);

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
