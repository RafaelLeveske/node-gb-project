const express = require('express');
const routes = require('./routes');
const uploadConfig = require('./config/upload');

require('./database/index');

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333);
