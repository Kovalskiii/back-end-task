import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader.js';
import userRegister from './controllers/userControllerRegister.js';
import userLogin from './controllers/userControllerLogin.js';

const router = Router();

router.post('/', serviceHeader('userRegister'), userRegister);

router.post('/login', serviceHeader('userLogin'), userLogin);

export default router;
