console.log('Starting server...');

const express = require('express');
const bodyParser = require('body-parser');
const playersRoute = require('./routes/players');
const { PORT, ROUTE_PLAYERS } = require('./constants');

const app = express();
app.use(bodyParser.json());

// Routes
app.use(ROUTE_PLAYERS, playersRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});