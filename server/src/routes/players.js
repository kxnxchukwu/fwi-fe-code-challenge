const router = require('express').Router();
const PlayersController = require('../controllers/PlayersController');

const controller = new PlayersController();

router.post('/', (req, res) => {
    const player = controller.create(req.body);
    res.status(201).json(player);
});

router.get('/', (req, res) => {
    const size = req.query.size ? parseInt(req.query.size, 10) : undefined;
    const start = req.query.start ? parseInt(req.query.start, 10) : undefined;
    const players = controller.getAll(start, size);
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