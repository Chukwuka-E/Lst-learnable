import { Router } from 'express';
import { createAccountHandler, getAccounts, decryptFields } from '../controllers/accountController';

const router = Router();

router.post('/accounts', createAccountHandler);
router.get('/accounts', getAccounts);
router.post('/decrypt', decryptFields);

export default router;