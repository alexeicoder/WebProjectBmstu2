import { Router, Request, Response } from "express";
import { Container } from '../core/container';
import { IAuthRequest } from "../interfaces/auth.interfaces";
import { verifyToken } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to Auth Service API');
});

router.post('/register', (req: Request, res: Response) => {
    Container.getAuthController().register(req, res)
});
router.post('/login', (req: Request, res: Response) => {
    Container.getAuthController().login(req, res);
});

router.post('/signout', (req: Request, res: Response) => {
    Container.getAuthController().signout(req, res);
});

router.get('/validatetoken', verifyToken, (req: IAuthRequest, res: Response) => {
    Container.getAuthController().validateToken(req, res);
})

router.get('/refresh', (req: IAuthRequest, res: Response) => {
    Container.getAuthController().refreshToken(req, res);
})

router.get('/find/user/id/:id', (req: Request, res: Response) => {
    Container.getAuthController().findById(req, res);
})

router.get('/find/user/login/:login', (req: Request, res: Response) => {
    Container.getAuthController().findByLogin(req, res);
})

router.get('/find/all', (_req: Request, res: Response) => {
    Container.getAuthController().getAllUsers(_req, res);
})

router.put('/update/user/:id', verifyToken, (req: IAuthRequest, res: Response) => {
    Container.getAuthController().updateUser(req, res);
});

router.delete('/delete/user/:id', verifyToken, (req: IAuthRequest, res: Response) => {
    Container.getAuthController().deleteUser(req, res);
});

router.get('/exists/user/:id', (req: Request, res: Response) => {
    Container.getAuthController().ifExistsById(req, res);
});

export default router;