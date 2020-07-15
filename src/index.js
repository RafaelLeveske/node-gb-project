require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const uploadConfig = require('./config/upload');

require('./database/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(process.env.APP_PORT || 3333);
