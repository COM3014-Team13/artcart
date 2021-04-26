import express from 'express';

const router = express.Router();

router.post('/api/auth', (req, res) => {
    res.send('Hi there!');
});

export { router as loginRouter };