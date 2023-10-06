import express from 'express' ;
import { userRegister,userLogin } from '../Controllers/userController.js';

var router = express.Router()

//register
router.post('/register',userRegister)

//login
router.post('/login',userLogin)







export default router