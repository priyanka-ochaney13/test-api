import { Router } from "express";

const subsRouter = Router();

subsRouter.get('/', (req, res) => res.send({
    title: 'GET all subscriptions'
}));

subsRouter.get('/:id', (req, res) => res.send({
    title: 'GET a subscription by ID'
}));

subsRouter.post('/', (req, res) => res.send({
    title: 'POST a new subscription'
}));

subsRouter.put('/:id', (req, res) => res.send({
    title: 'UPDATE a subscription by ID'
}));

subsRouter.delete('/:id', (req, res) => res.send({
    title: 'DELETE a subscription by ID'
}));

subsRouter.get('/user/:id', (req, res) => res.send({
    title: 'GET subscriptions by user ID'
}));

subsRouter.put('/:id/cancel', (req, res) => res.send({
    title: 'CANCEL a subscription by ID'
}));

subsRouter.get('/upcoming-renewals', (req, res) => res.send({
    title: 'GET upcoming renewals'
}));

export default subsRouter;

