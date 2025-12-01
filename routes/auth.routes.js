import { Router } from "express";
const authRouter = Router();

authRouter.post('/signup', (req, res) => res.send({ title: 'Sign up' }));
authRouter.post('/signin', (req, res) => res.send({ title: 'Sign in' }));
authRouter.post('/signout', (req, res) => res.send({ title: 'Sign out' }));

export default authRouter; 