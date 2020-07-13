const fs = require('fs');
const uuid = require('uuid/v4');
const Joi = require('joi');
const {
  COUNTRIES,
  DATA_FILE,
  PLAYER_LIST_DEFAULTS,
  SORT_ORDER_DESC,
} = require('../constants');
const { NotFoundError, BadRequestError } = require('../errors');

class PlayersController {
  constructor() {
    this.playerSchema = Joi.object().keys({
      id: Joi.string().guid().required(),
      name: Joi.string().required(),
      country: Joi.string().valid(COUNTRIES).required(),
      winnings: Joi.number().required(),
      imageUrl: Joi.string().uri().optional().allow(null).default(null),
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
      allowUnknown: false,
    });
    if (result.error) {
      throw new BadRequestError();
    }
  }

  createSortingFunction(sortBy, sortOrder) {
    if (sortBy === 'winnings') {
      return (a, b) => {
        if (sortOrder === SORT_ORDER_DESC) {
          return b[sortBy] - a[sortBy];
        } else {
          return a[sortBy] - b[sortBy];
        }
      };
    } else {
      return (a, b) => {
        const vA = a[sortBy].toUpperCase();
        const vB = b[sortBy].toUpperCase();
        if (sortOrder === SORT_ORDER_DESC) {
          if (vA > vB) return -1;
          else if (vA < vB) return 1;
          else return 0;
        } else {
          if (vA < vB) return -1;
          else if (vA > vB) return 1;
          else return 0;
        }
      };
    }
  }

  getAll(params = {}) {
    const { sortBy, sortOrder, from, size } = Object.assign(
      {},
      PLAYER_LIST_DEFAULTS,
      params
    );
    const data = this.readData();
    const dataArr = Object.values(data);
    if (sortBy && sortOrder) {
      dataArr.sort(this.createSortingFunction(sortBy, sortOrder));
    }
    const result = dataArr.slice(from, from + size);
    return {
      total: dataArr.length,
      size: result.length,
      from,
      players: result,
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
    if (!record.imageUrl) {
      player.imageUrl = `http://i.pravatar.cc/40?u=${player.id}`;
    }
    if (validate) {
      this.validate(player);
    }
    data[player.id] = player;
    this.writeData(data);
    return player;
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
    return player;
  }

  delete(id) {
    const data = this.readData();
    if (!data[id]) {
      throw new NotFoundError();
    }
    delete data[id];
    this.writeData(data);
  }
}

module.exports = PlayersController;
