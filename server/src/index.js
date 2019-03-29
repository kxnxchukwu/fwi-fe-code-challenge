console.log('Starting server...');

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const playersRoute = require('./routes/players');
const {
    PORT,
    ROUTE_PLAYERS,
    DATA_DIR,
    DATA_FILE,
    INITIAL_DATA_FILE
} = require('./constants');
const { errorHandler } = require('./errors');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(ROUTE_PLAYERS, playersRoute);

// Catch all error handler
app.use(errorHandler);

// Creating initial data set if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(DATA_FILE)) {
    fs.copyFileSync(INITIAL_DATA_FILE, DATA_FILE);
    fs.chmodSync(DATA_FILE, "0777");
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});