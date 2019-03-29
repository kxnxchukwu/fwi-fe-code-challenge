const router = require('express').Router();
const PlayersController = require('../controllers/PlayersController');
const { ROUTE_PLAYERS, PLAYER_SORTABLE_FIELDS, SORT_ORDER_ASC, SORT_ORDER_DESC } = require('../constants');

const controller = new PlayersController();

router.post('/', (req, res) => {
    const player = controller.create(req.body);
    res.status(201).location(`${ROUTE_PLAYERS}/${player.id}`).json(player);
});

router.get('/', (req, res) => {
    const { size, from, sortBy, sortOrder } = req.query;
    const params = {};
    if (size) {
        params.size = parseInt(size, 10);
    }
    if (from) {
        params.from = parseInt(from, 10);
    }
    if (sortBy && PLAYER_SORTABLE_FIELDS.includes(sortBy)) {
        params.sortBy = sortBy;
        if (sortOrder && [SORT_ORDER_ASC, SORT_ORDER_DESC].includes(sortOrder)) {
            params.sortOrder = sortOrder;
        } else {
            params.sortOrder = SORT_ORDER_ASC;
        }
    }
    const players = controller.getAll(params);
    res.status(200).json(players);
});

router.get('/:id', (req, res) => {
    const player = controller.getById(req.params.id);
    res.status(200).json(player);
});

router.patch('/:id', (req, res) => {
    const player = controller.update(req.params.id, req.body);
    res.status(200).json(player);
});

router.delete('/:id', (req, res) => {
    controller.delete(req.params.id);
    res.status(204).send();
});

module.exports = router;