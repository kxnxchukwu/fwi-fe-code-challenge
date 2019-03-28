console.log('Starting server...');

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const playersRoute = require('./routes/players');
const { PORT, ROUTE_PLAYERS } = require('./constants');

const app = express();
app.use(bodyParser.json());

// Routes
app.use(ROUTE_PLAYERS, playersRoute);

// Creating initial data set if it doesn't exist
const initialDataFile = path.join(__dirname, '..', 'initialData.json');
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'index.json');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
if (!fs.existsSync(dataFile)) {
    fs.copyFileSync(initialDataFile, dataFile);
    fs.chmodSync(dataFile, 777);
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});