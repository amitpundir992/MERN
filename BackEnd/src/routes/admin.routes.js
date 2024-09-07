import { Router } from "express";
import { getAllContacts, getAllUsers, deleteUser, getUserToUpdate, updateUser, deleteContact} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.route('/users').get(verifyJWT,adminMiddleware,getAllUsers)
router.route('/contacts').get(verifyJWT,adminMiddleware,getAllContacts)
router.route('/users/:id').get(verifyJWT,adminMiddleware,getUserToUpdate)
router.route('/users/update/:id').patch(verifyJWT,adminMiddleware,updateUser)
router.route('/users/delete/:id').delete(verifyJWT,adminMiddleware,deleteUser)
router.route('/contacts/delete/:id').delete(verifyJWT,adminMiddleware,deleteContact)
export default router;

