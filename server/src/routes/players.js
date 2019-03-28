const router = require('express').Router();

router.post('/', (req, res) => {
    res
        .status(201)
        .location('http://localhost:3001/players/b205f6ba-f572-4771-9d2c-3dbb16a74d16')
        .json({
            "id": "70629df2-571a-4899-b36a-8f36c909508a",
            "name": "Bob Bobbity",
            "country": "US",
            "winnings": 0,
            "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
        });
});

router.get('/', (req, res) => {
    res.status(200).json({
        from: 0,
        size: 0,
        total: 0,
        players: []
    });
});

router.get('/:id', (req, res) => {
    res.status(200).json({
        "id": "70629df2-571a-4899-b36a-8f36c909508a",
        "name": "Bob Bobbity",
        "country": "US",
        "winnings": 93024,
        "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
    });
});

router.patch('/:id', (req, res) => {
    res.status(200).json({
        "id": "70629df2-571a-4899-b36a-8f36c909508a",
        "name": "Bob Hoppity",
        "country": "US",
        "winnings": 23456,
        "imageUrl": "https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a"
    });
});

router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'Player has been deleted' });
});

module.exports = router;