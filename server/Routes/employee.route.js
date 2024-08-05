import {Router} from 'express'
import { deleteEmployee, getAllEmployees, getEmployee, newEmployee, updateEmployee } from '../controllers/emmployee.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js';

const router = Router()


router.route('/getAll').get(getAllEmployees);
router.route('/')
    .post(upload.single('image'),newEmployee)
    
router.route('/:id')
    .get(getEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)
export default router;