import { Router } from "express";
import { contactForm, loginUser, registerUser, user} from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js"
import signupSchema from "../validators/auth.validator.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(validate(signupSchema), registerUser);
router.route("/login").post(loginUser);
router.route("/user").get(verifyJWT,user);
router.route("/contact").post(contactForm);

export {router}