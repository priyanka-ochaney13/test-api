import { Router } from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";
const authRouter = Router();

// path: /api/v1/auth/signup
authRouter.post('/signup', signup);
// path: /api/v1/auth/signin
authRouter.post('/signin', signin);
// path: /api/v1/auth/signout
authRouter.post('/signout', signout);

export default authRouter; 