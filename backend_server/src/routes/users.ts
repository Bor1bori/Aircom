import express from 'express';
import * as usersController from '@src/controllers/users';

const router = express.Router();

/* GET users listing. */
router.get('/', usersController.getUsers);

export default router;
