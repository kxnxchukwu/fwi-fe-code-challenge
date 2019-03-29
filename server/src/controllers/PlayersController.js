const fs = require('fs');
const uuid = require('uuid/v4');
const Joi = require('joi');
const { COUNTRIES, DATA_FILE } = require('../constants');
const { NotFoundError, BadRequestError } = require('../errors');

class PlayersController {
    constructor() {
        this.playerSchema = Joi.object().keys({
            id: Joi.string().guid().required(),
            name: Joi.string().required(),
            country: Joi.string().valid(COUNTRIES).required(),
            winnings: Joi.number().required(),
            imageUrl: Joi.string().uri().optional().allow(null).default(null)
        });
    }

    readData() {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    }

    writeData(data) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data));
    }

    validate(data) {
        const result = Joi.validate(data, this.playerSchema, {
            abortEarly: false,
            allowUnknown: false
        });
        if (result.error) {
            throw new BadRequestError();
        }
    }

    getAll(start = 0, size = 25) {
        const data = this.readData();
        const ids = Object.keys(data);
        const result = ids.slice(start, start + size).map(id => data[id]);
        return {
            total: ids.length,
            size: result.length,
            from: start,
            players: result
        };
    }

    getById(id) {
        const data = this.readData();
        if (!data[id]) {
            throw new NotFoundError();
        }
        return data[id];
    }

    create(record, validate = true) {
        const data = this.readData();
        const player = Object.assign({}, record, { id: uuid() });
        if (validate) {
            this.validate(player);
        }
        data[player.id] = player;
        this.writeData(data);
    }

    update(id, record, validate = true) {
        const data = this.readData();
        if (!data[id]) {
            throw new NotFoundError();
        }
        const player = Object.assign({}, data[id], record, { id });
        if (validate) {
            this.validate(player);
        }
        data[id] = player;
        this.writeData(data);
    }

    delete(id) {
        const data = this.readFile();
        if (!data[id]) {
            throw new NotFoundError();
        }
        delete data[id];
        this.writeData(data);
    }
}

module.exports = PlayersController;