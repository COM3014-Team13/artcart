import express from 'express';
import { currentUser } from '@com3014/common';


const router = express.Router();

router.get('/api/user', currentUser, (req, res) => {
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
