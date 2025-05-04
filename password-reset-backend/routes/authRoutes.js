import express from 'express';
import { loginUser, me, requestReset, resetPassword } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/request-reset', requestReset);
router.post('/reset-password/:token', resetPassword);
router.post('/login', loginUser);
router.get('/me',authenticate, me);




export default router;