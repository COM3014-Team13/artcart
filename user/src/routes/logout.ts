import express from 'express';

const router = express.Router();

router.post('/api/user/logout', (req, res) => {
    req.session = null;

    res.send({});
});

export { router as logoutRouter };