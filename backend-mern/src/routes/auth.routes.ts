import { Router } from "express";
import { signUp, signIn } from "../controllers/user.controller";
import { ReturnDocument } from "mongodb";

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;